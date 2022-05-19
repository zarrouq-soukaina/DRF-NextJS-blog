import * as React from 'react';
import Header from "../../components/header";
import { styled } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

 function Blog({post, categories}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
     <>
    <Header data={categories}/>
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
      
        title={post.title}
        subheader={post.created_at}
      />
      <CardMedia 
        component="img"
        height="194"
        image={post.blog_image[0].image}
        title="Image title"
        alt={post.blog_image[0].alt_text}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        {post.intro}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
       
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
         
          <Typography paragraph>
          {post.content}
          </Typography>
         
         
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}
export async function getStaticPaths(){
  return{
    paths: [{params: { slug: "blog2" } }],
    fallback: true,
  };
}

export async function getStaticProps({ params }) {

  const res = await fetch(`http://127.0.0.1:8000/api/${params.slug}`);
  const post = await res.json();

  const ress = await fetch("http://127.0.0.1:8000/api/category/");
  const categories = await ress.json();


  return{
    props: {
      post,
      categories,
    },
  };

}
export default Blog ;