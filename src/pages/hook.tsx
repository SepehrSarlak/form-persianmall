import React, { useEffect, useState, useRef, useMemo } from "react";
export const hook = () => {
  const [done, setDone] = useState(false);
  const [completed, setCompleted] = useState(false);


  return {
    done,
    setDone,
    completed,
    setCompleted,
  };
};
