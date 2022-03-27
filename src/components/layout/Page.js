function Page({ title, children }) {
  return (
    <>
      <h3 className="layout-title bordered">{title}</h3>
      <section className="layout-content">{children}</section>
    </>
  );
}

export default Page;
