//Install Express: ???

//Install Morgan: npm install morgan




const express = require("express");
const morgan = require("morgan")
const postBank = require("./postList.js")
const app = express();
app.use(express.static('public')) //NOTE THIS

app.use(morgan('dev'));

app.get("/post/:id", (req,res) => {
  const id = req.params.id;
  const post = postBank.find(id);
   const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>${post.JobTitle}</title>
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><h1>America's Job</h1></header>
      <a href = '/'>Back to Main Page</a><BR>

       <h2>${post.Company}</h2>
      <BR>
      <pre style = 'font-family:Verdana'>
      ${post.Description}
      </pre>
    </div>
  </body>
</html>`;
  res.send(html)
})

app.get("/", (req, res) => {
  
  const posts = postBank.list();
  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>America's Job Bank</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><h1>node.js jobs</h1></header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">▲</span>
            <a href ="/post/${post.ID}">${post.JobTitle}</a>
            <small>(by ${post.Company})</small>
          </p>
          <small class="news-info">
            Posted on ${post.PostDate} | Salary ${post.Salary}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`;
  res.send(html)  
})

//app.get("/", (req, res) => res.send("Hello World!!"));

const PORT = 1418;


app.listen(PORT, () => {
  console.log(`App really listening in port ${PORT}`);
});
