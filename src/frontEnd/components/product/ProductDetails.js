import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
// Icon
import { KeyboardBackspace } from "@mui/icons-material";
// Data
import { DataContext } from "../../context/Context";

const ProductDetailsContext = () => {
  const { id } = useParams();
  const value = useContext(DataContext);
  const [products] = value.products;

  const [index, setIndex] = useState(0);
  const addCart = value.addCart;
  const imgDiv = useRef();

  const demoFilter = products.filter((item) => item._id === id);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    imgDiv.current.style.backgroundPosition = `${x}% ${y}%`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const container = {
    dispaly: "flex",
    flexDirection: "row",
    padding: "50px",
  };
  const btnContainer = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #fff",
    mt: "50px",
  };

  return (
    <div
      style={{
        background: "#121519",
        minHeight: "100vh",
        transition: "all 0.50s linear",
      }}>
      <Container sx={container} maxWidth="xl">
        <Box component="div" p="0">
          <Link to="/products">
            <KeyboardBackspace
              style={{
                cursor: "pointer",
                color: "#fcc21b",
                fontSize: "40px",
              }}
            />
          </Link>
        </Box>

        {demoFilter.map((product) => (
          <Grid
            key={product._id}
            container
            mt="60px"
            sx={{
              display: "flex",
              justifyContent: "space-around",
              border: "1px solid #ccc",
              borderRadius: "10px",
            }}>
            <Grid
              item
              xs={12}
              lg={5}
              sx={{
                display: "flex",
                justifyContent: "center",
                m: "40px 0",
              }}>
              <div
                style={{
                  backgroundImage: `url(${product.images[index]})`,
                  width: "100%",
                }}
                onMouseMove={handleMouseMove}
                ref={imgDiv}
                onMouseLeave={() =>
                  (imgDiv.current.style.backgroundPosition = `canter`)
                }></div>
            </Grid>

            <Grid
              item
              xs={12}
              lg={5}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                margin: {
                  xs: "0",
                  md: "100px 0",
                },
                padding: "20px",
              }}>
              <Typography variant="h5" color="#fff">
                {product.enTitle}
              </Typography>
              <Typography variant="h5" my={3} color="#fff">
                {product.price} $
              </Typography>
              <Box>
                {product &&
                  product.colors.map((color, index) => (
                    <button
                      key={index}
                      style={{
                        background: color,
                        width: "40px",
                        height: "10px",
                        border: "none",
                        margin: "0 2px",
                      }}></button>
                  ))}
              </Box>
              <Typography variant="h6" my={3} color="#ccc">
                {product.descriptionEN}
              </Typography>

              <Typography variant="h6" color="#ccc">
                {product.contentEN}
              </Typography>

              <Box sx={btnContainer}>
                <Box>
                  {product.images.map((img, index) => (
                    <img
                      style={{ width: "60px", margin: "20px 7px 0" }}
                      src={img}
                      key={index}
                      onClick={() => setIndex(index)}
                      alt="demo"
                    />
                  ))}
                </Box>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ mt: "20px" }}
                  onClick={() => addCart(product._id)}>
                  Add to Cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Container>
    </div>
  );
};

export default ProductDetailsContext;
