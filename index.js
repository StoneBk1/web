import express, { urlencoded } from 'express';
import ejs from 'ejs';
import { v4 as uuidv4 } from 'uuid';
import methodOverride from 'method-override';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
// Define an array of comments with real usernames
app.use(methodOverride('_method'))
let comments = [
    {
        id: uuidv4(),
        username: "John Doe",
        comment: "This is the first comment.",
        userInfo: {
            age: 25,
            country: "USA",
            // Add more dummy user information as needed
        }
    },
    {
        id: uuidv4(),
        username: "Alice Smith",
        comment: "Second comment here.",
        userInfo: {
            age: 30,
            country: "Canada",
            // Add more dummy user information as needed
        }
    },
    {
        id: uuidv4(),
        username: "Bob Johnson",
        comment: "And here goes the third comment.",
        userInfo: {
            age: 22,
            country: "UK",
            // Add more dummy user information as needed
        }
    }
];
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index.ejs', { comments });
})
app.get('/new', (req, res) => {
    res.render('new.ejs');
})
app.post('/submit', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuidv4()});
    
    res.redirect('/');


})
app.get('/comments/:id', (req, res) => { 
    const { id } = req.params;
    console.log('Requested ID:', id);
    const comment = comments.find((c) => c.id === id);
    console.log('Found comment:', comment);
    res.render('show.ejs', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render('edit.ejs', { comment });
})
app.patch('/comments/:id', (req, res) =>  {
    const { id } = req.params;
    let foundNewComment = req.body.comment
    const foundComment = comments.find((c) => c.id === id);
    foundComment.comment = foundNewComment;
    res.redirect('/');
    
})
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id)
    res.redirect('/');

})









app.listen(port, () => {
    console.log(`the server is running on port ${port}`)
})