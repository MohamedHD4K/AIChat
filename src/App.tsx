function App() {
  const object = {
    name: "John",
  };

  if ("age" in object) {
    console.log(object.age);
  }
  return (
    <div>
      <button className="btn btn-primary">Primary</button>
    </div>
  );
}

export default App;
