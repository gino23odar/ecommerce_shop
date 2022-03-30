import React from 'react'
import {Container, Typography, Button, Grid} from '@material-ui/core';
import {Link} from 'react-router-dom';

import useStyles from './styles';
import CartItem from './CartItem/CartItem';

const Cart = ({cart, handleUpdateCartQuantity, handleRemoveCartItem, handleEmptyCart}) => {
  const classes = useStyles();

  function EmptyCart() {
    return (
      <Typography variant='subtitle1'>
        No Items In The Cart!
        <Link to='/' className={classes.link}> Add some</Link>!
      </Typography>
    );
  }

  const FilledCart = () =>(
    <>
      <Grid container spacing={3}>
        {cart.line_items.map((item)=>(
          <Grid item xs={12} sm={4} key={item.id}>
            <CartItem item={item} onUpdateCartQuantity={handleUpdateCartQuantity} onRemoveCartItem={handleRemoveCartItem}/>
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
          <Typography variant='h4'>
            Subtotal: {cart.subtotal.fomatted_with_symbol}
          </Typography>
          <div>
            <Button className={classes.emptyButton} type='button' size='large' variant='contained' color='secondary' onClick={handleEmptyCart}>Empty</Button>
            <Button component={Link} to='/checkout'className={classes.checkoutButton} type='button' size='large' variant='contained' color='primary'>Checkout</Button>
          </div> 
      </div>
    </>
  );

  if(!cart.line_items) return 'Loading...';

  return (
    <div>
      <Container>
        <div className={classes.toolbar}/>
        <Typography className={classes.title} variant='h3' gutterBottom>Shopping Cart</Typography>
        {!cart.line_items.length ? <EmptyCart/> : <FilledCart/>}
      </Container>
    </div>
  )
}

export default Cart