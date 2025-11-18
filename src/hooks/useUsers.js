import { useState } from "react";

export function useUser() {
  const [userId, setUserId] = useState(null);

  return { userId, setUserId };
}
