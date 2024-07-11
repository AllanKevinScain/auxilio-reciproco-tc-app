"use client";
export const Modal: React.FC = () => {
  return (
    <dialog open>
      <p>Greetings, one and all!</p>
      <form method="dialog">
        <button>OK</button>
      </form>
    </dialog>
  );
};
