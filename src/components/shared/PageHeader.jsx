
function PageHeader({ title, description }) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
}

export default PageHeader;