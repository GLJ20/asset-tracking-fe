import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const EditAsset = ({}) => {
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

//   React.useEffect(() => {
//     const handleProd = async () => {
//         const data = await GetProdById(id)
//         setProduct(data)
//     }
//     handleProd()
//   }, [id])

  const handleChange = (e) => {
    // setProduct({...product, [e.target.id]: e.target.value})
  }
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//         await UpdateProd(id, product)
//         setOpen(false)
//         setEdited(true)
//         toast("Product edited successfully")
//     } catch (error) {
//         console.error("Error updating product", error)
//         setOpen(false)
//     }
//   };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
          <DialogContentText>
            Edit product
          </DialogContentText>
          <form >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value='malak'
              onChange={handleChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              fullWidth
              variant="standard"
              value='me'
              onChange={handleChange}
            /> 
            <TextField
              autoFocus
              margin="dense"
              id="category"
              name="category"
              label="Category"
              type="text"
              fullWidth
              variant="standard"
              value='malak'
              onChange={handleChange}
            /> 
            <TextField
              autoFocus
              margin="dense"
              id="price"
              name="price"
              label="Price"
              type="number"
              step="0.01"
              fullWidth
              variant="standard"
              value='mal'
              onChange={handleChange}
            />  
            <TextField
              autoFocus
              margin="dense"
              id="stock"
              name="stock"
              label="Stock"
              type="number"
              fullWidth
              variant="standard"
              value='meme'
              onChange={handleChange}
            /> 
            <TextField
              autoFocus
              margin="dense"
              id="img"
              name="img"
              label="Image"
              type="text"
              fullWidth
              variant="standard"
              value='mak'
              onChange={handleChange}
            />    
            <TextField
              autoFocus
              margin="dense"
              id="color"
              name="color"
              label="Color"
              type="text"
              fullWidth
              variant="standard"
              value='me'
              onChange={handleChange}
            />                                                                     
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
export default EditAsset