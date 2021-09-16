import React from 'react';
import {Container,Box,Typography,Grid,makeStyles,Tooltip} from '@material-ui/core';
import {useSelector,useDispatch} from 'react-redux';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {deleteProduct} from '../redux/slice/productSlice'

const useStyle = makeStyles((theme)=>({
    productContainer:{
        border:"1px solid grey"
    },
    imageBox:{
        width:"100%",
        height:200,
        overflow:"hidden",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        [theme.breakpoints.down("sm")]:{
            height:180,
        },
        [theme.breakpoints.down("xs")]:{
            height:160,
        }

    },
    deleteIcon:{
        cursor:"pointer"
    }
}))

const ShowProduct = () => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const {productList} = useSelector(state => state.product)
    console.log(productList);
    
    const removeProduct = (id)=>{ // delete one product from prodct list
        dispatch(deleteProduct({id}))
    }
    return (
        <Container maxWidth="md">
            <Grid container>
                <Grid item xs={12}>
                    <Box pb={2}>
                        <Typography variant="h6">All product</Typography>
                    </Box>
                </Grid>
                <Grid container item xs={12} spacing={2}>
                    {productList.length ?
                    productList?.map((item,index)=>{
                        return(
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Box display='flex' flexDirection="column" p={1} className={classes.productContainer}>
                                    <Box  className={classes.imageBox}>
                                        <Typography variant="h6">Image</Typography>
                                    </Box>
                                    <Box  display="flex" flexDirection="column">
                                        <Box pb={1}>
                                        <Typography>{item?.name}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography>{item?.price} TK</Typography>
                                        <Tooltip title="Delete product" arrow>
                                        <DeleteOutlineIcon  className={classes.deleteIcon} onClick={()=> removeProduct(item?.id)} />
                                        </Tooltip>
                                        
                                        </Box>
                                    </Box>
                                </Box>

                            </Grid>
                        )
                    })
                   :null}
                </Grid>

            </Grid>
        
        </Container>
    )
}

export default ShowProduct