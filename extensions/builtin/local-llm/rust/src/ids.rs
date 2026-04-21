use serde::{Deserialize, Serialize};

macro_rules! string_newtype {
    ($name:ident) => {
        #[derive(Debug, Clone, PartialEq, Eq, Hash, Serialize, Deserialize)]
        #[serde(transparent)]
        pub struct $name(pub String);

        impl $name {
            pub fn new(s: impl Into<String>) -> Self {
                Self(s.into())
            }

            pub fn as_str(&self) -> &str {
                &self.0
            }

            pub fn into_string(self) -> String {
                self.0
            }
        }

        impl From<String> for $name {
            fn from(s: String) -> Self {
                Self(s)
            }
        }

        impl From<&str> for $name {
            fn from(s: &str) -> Self {
                Self(s.to_owned())
            }
        }

        impl std::fmt::Display for $name {
            fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
                self.0.fmt(f)
            }
        }
    };
}

string_newtype!(ThreadId);
string_newtype!(MessageId);
string_newtype!(DeploymentId);
string_newtype!(InstallId);

impl ThreadId {
    pub fn new_random() -> Self {
        Self(uuid::Uuid::new_v4().to_string())
    }
}

impl MessageId {
    pub fn new_random() -> Self {
        Self(uuid::Uuid::new_v4().to_string())
    }
}
