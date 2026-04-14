"""Session state machine and thread management for chat conversations."""
from __future__ import annotations

import time
import uuid
from dataclasses import dataclass, field
from enum import Enum
from typing import Any


class SessionState(Enum):
    """Lifecycle states of a chat session."""

    ACTIVE = "active"
    PAUSED = "paused"
    CLOSED = "closed"


@dataclass(frozen=True)
class ThreadMessage:
    """An immutable record of one message within a thread."""

    message_id: str
    role: str
    content: str
    timestamp: float
    metadata: dict[str, Any] = field(default_factory=dict)


@dataclass(frozen=True)
class Thread:
    """An immutable snapshot of a conversation thread."""

    thread_id: str
    session_id: str
    messages: tuple[ThreadMessage, ...] = ()
    created_at: float = 0.0

    def append_message(self, role: str, content: str, metadata: dict[str, Any] | None = None) -> Thread:
        """Return a new Thread with the message appended."""
        msg = ThreadMessage(
            message_id=str(uuid.uuid4()),
            role=role,
            content=content,
            timestamp=time.time(),
            metadata=metadata or {},
        )
        return Thread(
            thread_id=self.thread_id,
            session_id=self.session_id,
            messages=(*self.messages, msg),
            created_at=self.created_at,
        )

    def to_message_dicts(self) -> list[dict[str, str]]:
        """Serialize thread messages into the format expected by backend adapters."""
        return [{"role": m.role, "content": m.content} for m in self.messages]


class SessionManager:
    """Manages chat sessions and their threads in memory.

    Persistence to extension storage is handled at the operator level
    via JSON-RPC calls to the host.
    """

    def __init__(self) -> None:
        self._sessions: dict[str, SessionState] = {}
        self._threads: dict[str, Thread] = {}

    def create_session(self) -> str:
        """Create a new chat session, returning its id."""
        session_id = str(uuid.uuid4())
        self._sessions[session_id] = SessionState.ACTIVE
        return session_id

    def session_state(self, session_id: str) -> SessionState | None:
        """Return the current state of a session, or None if unknown."""
        return self._sessions.get(session_id)

    def close_session(self, session_id: str) -> None:
        """Transition a session to CLOSED and discard its threads from memory."""
        self._sessions[session_id] = SessionState.CLOSED
        thread_ids = [
            tid for tid, t in self._threads.items() if t.session_id == session_id
        ]
        for tid in thread_ids:
            del self._threads[tid]

    def create_thread(self, session_id: str) -> Thread:
        """Create a new thread within a session."""
        if self._sessions.get(session_id) != SessionState.ACTIVE:
            raise ValueError(f"Session {session_id} is not active")

        thread = Thread(
            thread_id=str(uuid.uuid4()),
            session_id=session_id,
            created_at=time.time(),
        )
        self._threads[thread.thread_id] = thread
        return thread

    def get_thread(self, thread_id: str) -> Thread | None:
        """Retrieve a thread by id."""
        return self._threads.get(thread_id)

    def update_thread(self, thread: Thread) -> None:
        """Replace the in-memory thread snapshot."""
        self._threads[thread.thread_id] = thread

    def list_threads(self, session_id: str) -> list[Thread]:
        """Return all threads belonging to a session."""
        return [t for t in self._threads.values() if t.session_id == session_id]
