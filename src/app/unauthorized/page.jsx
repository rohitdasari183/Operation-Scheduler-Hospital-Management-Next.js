// app/unauthorized/page.jsx
export default function Unauthorized() {
    return (
      <div className="p-10 text-center text-red-600 font-semibold">
        <h1 className="text-3xl">🚫 Unauthorized Access</h1>
        <p className="mt-4">You do not have permission to view this page.</p>
      </div>
    );
  }
  