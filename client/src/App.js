import React from "react";
import Scan from "./Scan"
function App() {

  return (
    <div className="app">
    <form
      action="/upload"
      encType="multipart/form-data"
      method="post"
    >
      <label className ="lable"><b>Filter the book(txt):</b></label><br></br>
      <p><b>1 step:</b> <input type="file" name="filedata" accept=".txt" /></p>
      <p><b>2 step:</b> <input type="submit" value="Go!" /></p>
    </form>
    <Scan />
    </div>
  );
}

export default App;

// taskkill /f /im node.exe
