"""Spec-035 validation entrypoint package for the local-llm worker.

The host's dependency validate step derives the runnable module from the
first ``[project.scripts]`` entry and spawns ``python -m <package>`` with
the worker directory as cwd. The legacy worker tree imports itself as the
``worker`` package (rooted at the extension directory), so this thin
package bootstraps ``sys.path`` before delegating to the real worker.
"""
