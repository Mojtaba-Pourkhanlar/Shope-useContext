import { Box, Button, CardMedia, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Product = ({ dataProduct, addCart }) => {
  
  // Style
  //#region
  const container = {
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#0c0e11",
    transition: "all 0.50s ease",
    margin: {
      xs: "0 ",
      md: "0 10px 0px",
    },
  };

  const linkContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "35px 10px 20px",
  };
  //#endregion

  return (
    <Grid container sx={container}>
      <Grid item m={1}>
        <CardMedia
          sx={{
            borderRadius: "10px",
            height: "310px",
          }}
          component="img"
          image={dataProduct.images[0]}
          alt="Product"
        />
      </Grid>
      <Grid item mx={1} mt="30px">
        <Typography variant="h5" color="#fff">
          {dataProduct.enTitle}
        </Typography>

        <Typography variant="h6" my="20px" color="#858585">
          {dataProduct.descriptionEN}
        </Typography>

        <Typography variant="h6" color="#858585">
          {`${dataProduct.price} $`}
        </Typography>
      </Grid>

      <Grid item sx={linkContainer}>
        <Link
          style={{ textDecoration: "none", color: "primary" }}
          to={`/products/${dataProduct._id}`}>
          <Button variant="outlined" color="secondary">
            Detail
          </Button>
        </Link>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => addCart(dataProduct._id)}>
            Add to Cart
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Product;
