import React, { useContext, useEffect, useState } from "react";
import { Container, Typography, Grid, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
// Icon
import { KeyboardBackspace } from "@mui/icons-material";
import { DataContext } from "../../context/Context";

const ContextCart = () => {
  const value = useContext(DataContext);
  const [cart] = value.cart;
  const increase = value.increase;
  const decrease = value.decrease;
  const removeProduct = value.removeProduct;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.count;
      }, 0);
      setTotal(res);
    };
    getTotal();
  }, [cart]);

  // Style
  //#region
  const container = {
    dispaly: "flex",
    flexDirection: "column",
    alignItems: "start",
    backgroundColor: "transparent",
    paddingTop: "30px",
  };
  const cartGrid = {
    border: "1px solid #ccc",
    transition: "all 0.50s ease",
    borderRadius: "5px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: "15px",
  };
  //#endregion

  return (
    <div
      style={{
        backgroundColor: "#121519",
        transition: "all 0.50s linear",
        minHeight: "100vh",
      }}>
      <Container sx={container} maxWidth="xl">
        <Box component="div" mb={5}>
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
        {cart.map((product) => (
          <Grid container sx={cartGrid} key={product._id}>
            <Grid item>
              <img src={product.images[0]} width="350px" alt="contextImages" />
            </Grid>

            <Grid item xs={12} sm={8} md={4} my={3}>
              <Typography variant="h4" mb="50px" sx={{ color: "#ffffff" }}>
                {product.enTitle}
              </Typography>
              <Typography
                variant="h6"
                sx={{ color: "#ffffff" }}>
                {product.price} $
              </Typography>

              <Box
              my={1}
              >
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

              <Box>
                <Typography
                  my={2}
                  variant="h6"
                  fontSize="16px"
                  sx={{ color: "#ffffff" }}>
                  {product.descriptionEN}
                </Typography>
                <Typography
                  variant="h6"
                  fontSize="16px"
                  sx={{ color: "#ffffff" }}>
                  {product.contentEN}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={2}>
              <Box my={2} align="center">
                <Button
                  variant="contained"
                  color="warning"
                  >
                  {product.count}
                </Button>
                <Box my={4}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => increase(product._id)}>
                    +
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => decrease(product._id)}>
                    -
                  </Button>
                </Box>

                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => removeProduct(product._id)}>
                  Remove cart
                </Button>
              </Box>
            </Grid>
          </Grid>
        ))}
        {total > 0 && (
          <Typography variant="h5" color="primary" py="50px">
            <span style={{ color: "#fff" }}>Total Payments : </span>
            {total} $
          </Typography>
        )}
        <Box>
          {cart.length === 0 ? (
            <Typography variant="h4" pt={10} align="center" color="red">
              The shopping cart is empty
            </Typography>
          ) : null}
        </Box>
      </Container>
    </div>
  );
};

export default ContextCart;
