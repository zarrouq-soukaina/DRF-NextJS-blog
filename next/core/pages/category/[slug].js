import * as React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Header from "../../components/header";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActionArea, CardActions } from '@material-ui/core';
import { useRouter } from "next/router";
const useStyles = makeStyles((theme) => ({
  example: {
    color: "#C5D0C1",
    display:"flex",
    justifyContent: "space-around",
    flexWrap : "wrap",
    flexBasis : "50%"

  },
  carddiv: {
    width : " 40%",
    margin : "5%"

  },

  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    borderRadius: "0",
    background: "#d6cbd3"
  
  },
  cardMedia: {
    width : "100%",
    height : "210px"
  },
  CardContent: {
    width : "100%",
    height : "300px",
    background: "#C5D0C1"
  },
}));
function Home({posts}){
  const classes = useStyles();
  const router = useRouter();
  return (
    <>
    <Header data={categories} />
    {console.log(posts)}
    <div className={classes.example}>

    {posts.map((post) => (
      
     <div item xs={6} sm={4} md={3} className={classes.carddiv}>
     <Card sx={{ maxWidth: 345 }} className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image={post.blog_image[0].image}
          title="Image title"
          alt={post.blog_image[0].alt_text}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {post.title}
          </Typography>
         
          <Typography variant="body2" color="text.secondary">
          {post.intro}
          </Typography> 
        </CardContent> 
      </CardActionArea> 
      <CardActions>
        <Button size="small" color="primary" key={post.id} href={`blog/${encodeURIComponent(post.slug)}`}>
          Show more
        </Button>
      </CardActions>
    </Card>
     </div>
   
     ))}
    </div>
    </>
  );
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { slug:"computer-science"} }],
    fallback: true,
  };
}
export async function getStaticProps(params) {
  const res = await fetch(`http://127.0.0.1:8000/api/category/${params.slug}`);
  const posts = await res.json();

  const ress = await fetch("http://127.0.0.1:8000/api/category/");
  const categories = await ress.json();
  return {
    props: {
      posts,
    },
  };
}
export default Home;