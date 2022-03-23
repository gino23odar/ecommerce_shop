import React from 'react';
import {Grid} from '@material-ui/core';

import Product from './Product/Product';

const products =[
  {id: 1, name:'Shoes', description:'Running shoes', price: '$5', image:'https://image.made-in-china.com/2f0j00ChLRIPgnbkbc/Desktop-Computer-Gaming-PC-New-Intel-Core-I7-Set-Personal-Game-Office-Home-Wholesale-Cheap-Price-Windows-10.jpg'},
  {id: 1, name:'PC', description:'Windows PC', price: '$100', image:'https://i.insider.com/5e4436f72dae5c62ab70fe92?width=1136&format=jpeg'}
];

const Products = () =>{
  return(
    <main>
      <Grid container justify = 'center' spacing={4}>
        {products.map((product) =>(
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product}/>
          </Grid>
        ))}
      </Grid>
    </main>
  )   
}
export default Products;