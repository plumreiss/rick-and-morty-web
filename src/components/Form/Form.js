export function Form({ handleSubmit, children }) {
  return <form onSubmit={handleSubmit}>{children}</form>;
}
