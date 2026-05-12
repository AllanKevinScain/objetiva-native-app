import { useState } from "react";

export function useFormTaskModal() {
  const [formTaskVisible, setFormTaskModal] = useState(false);

  function handleFormTaskModal() {
    setFormTaskModal((s) => !s);
  }

  return {
    formTaskVisible,
    handleFormTaskModal,
  };
}
