import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { AddData, GetData, UpdateData, DeleteData } from '../src/redux/action';

//MUI
import TextField from '@mui/material/TextField';
import { FormControl, FormLabel, colors } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { alpha } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Modal from '@mui/material/Modal';
import Tooltip from '@mui/material/Tooltip';
import swal from 'sweetalert';

//Icon Import
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddBoxIcon from '@mui/icons-material/AddBox';

//CSS IMPORT
import './App.css'
import './drawerfile.css';

//Files Import
import Add from './Actions/addVehicles';


const drawerWidth = 250;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open', })(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const style =
{
  position: 'absolute',
  top: '50%',
  left: '90%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflow: 'auto',
  p: 4,
  maxHeight: 650
};

const style2 =
{
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'auto',
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
  padding: '10px 30px 30px 30px'
};


export default function App() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);

  const [addopen, setAddOpen] = useState(false);
  const handleOpen = () => setAddOpen(true);
  const handleClose = () => setAddOpen(false);

  const [editopen, setEditOpen] = useState(false);
  const handleEditOpen = (id) => {
    setEditOpen({ ...editopen, [id]: true, });
  }
  const handleEditClose = () => setEditOpen(false);

  const [deleteConfirmation, setDeleteConfirmation] = React.useState(false);
  const handleDelete = (id) => {
    setDeleteConfirmation({ ...deleteConfirmation, [id]: true, });
  }
  const handleCancelDelete = () => setDeleteConfirmation(false);

  const [records, setRecords] = useState([]);
  const [vehicleData, setvehicleData] = useState([]);
  const [Data, setData] = useState({
    vehiclename: '',
    year: '',
    model: '',
    version: '',
    vinnumber: '',
    notes: ''
  });
  const [imageFile, setimageFile] = useState(null);
  const [newImageFile, setNewImageFile] = useState(null);
  const [attachmentFile, setattachmentFile] = useState(null);
  const convertyear = (date) => {
    const year = date.indexOf('-');
    return date.substring(0, year);

  };
  const handleImage = (event) => {
    const file = event.target.files[0];
    setimageFile(file);
    console.log(file);
  };
  const handleAttachment = (event) => {
    const file = event.target.files[0];
    setattachmentFile(file);
    console.log(file);
  };
  const { vehiclename, year, model, version, vinnumber, notes } = Data;

  const handleChange = (values) => {
    setData({ ...Data, [values.target.name]: values.target.value })
  };
  const handleEditChange = (event, index) => {
    const updatedVehicleData = [...vehicleData];
    const update = updatedVehicleData.find((a) => a.id === index);
    const p = event.target.name;
    update[p] = event.target.value;
    setvehicleData(updatedVehicleData);
  };

  //Get Data
  const getData = async () => {
    await axios.get(`http://localhost:5046/api/Vehicle`)
      .then(res => {
        dispatch(GetData(res.data))
        setvehicleData(res.data),
          setRecords(res.data)
      })
      .catch(error => console.error('Error:', error));
  }
  useEffect(() => {
    getData();
  }, [])
  //Get Data End

  //Filter data for searching
  const Filter = (event) => {
    setRecords(vehicleData.filter(f => f.vehiclename.toLowerCase().includes(event.target.value)));
  }
  // Filter ends

  //Add Data 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', imageFile);
    console.log(formData);

    Object.keys(Data).forEach((key) => {
      formData.append(key, Data[key]);
    });

    formData.append('attachments', attachmentFile);
    console.log(formData);
    console.log(Data);
    await axios.post('http://localhost:5046/api/Vehicle', formData,
      { headers: { "Content-Type": "multipart/form-data", }, }
    ).then((res) => {
      swal("Great !", "Successfully Added !!", "success");
      setTimeout(() => window.location.reload(), 1000)
      dispatch(AddData())
    })
    console.log(vehicleData);
  };
  //Add data end

  //Update Data
  const handleUpdate = async (id) => {
    try {
      console.log(id);
      const formData = new FormData();
      formData.append('image', imageFile);
      const update = vehicleData.find((a) => a.id === id);
      Object.keys(update).forEach((key) => {
        formData.append(key, update[key]);
      });
      formData.append('attachments', attachmentFile);
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }
      await axios.put(`http://localhost:5046/api/Vehicle`, formData,
        {
          headers: { "Content-Type": "multipart/form-data", },
        })
        .then((response) => {
          if (response.status == 200) {
            window.location.reload();
          }
        })
      dispatch(UpdateData())
    }
    catch (error) {
      console.error('Error updating data', error);
    }
  };
  //Update Data End

  //Delete Data
  const DeleteCard = async (id) => {
    try {
      console.log(id);
      await axios.delete(`http://localhost:5046/api/Vehicle/${id}`);
      setvehicleData(vehicleData.filter(a => a.id !== id));
      window.location.reload();
      dispatch(DeleteData());
    }
    catch (error) {
      console.error('Error Deleting Vehicle');
    }
  }
  //Delete End

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start" sx={{ mr: 2, ...(open && { display: 'none' }) }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Evaluation App
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Evaluation
          </Typography>
          <IconButton color="inherit"><AccountCircleIcon /></IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src="/PolarisLogo.jpg" alt="Polaris" style={{ height: '1.77rem' }} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List>
          {['Evaluation Builder/Viewer', 'Attribute Builder', 'Vehicle Manager', 'Evaluator Manager'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Summary Viewer'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

      </Drawer>

      <Main open={open}>
        <DrawerHeader />

        <div className="topLine">
          <h4>POLARIS  VEHICLE  MANAGER</h4>
          <div className="searchBox">
            <Toolbar>
              <Search>
                <SearchIconWrapper> <SearchIcon /> </SearchIconWrapper>
                <StyledInputBase onChange={Filter} placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
              </Search>
            </Toolbar>
            <Tooltip title='ADD VEHICLE'>
              <IconButton onClick={handleOpen}><AddBoxIcon style={{ color: 'blue' }} /></IconButton>
            </Tooltip>
            {/* Add Vehicle Details*/}
            <Modal
              open={addopen}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Add handleClose={handleClose} />
            </Modal>
          </div>
        </div>

        {/* Cards */}
        <Typography paragraph>
          {records.length == 0 ? (<div style={{ width: "85vw", height: "80vh", display: 'flex', justifyContent: "center", alignItems: "center", color: "black", fontSize: "3rem" }}>Vehicle not found :( </div>) : null}
          {records.map((vehicle) => (

            <Card sx={{ width: 'auto', display: 'flex', flexDirection: 'row', marginTop: '30px', padding: '20px', backgroundColor: '#f0f8ff' }} key={vehicle.id}>
              <CardActionArea style={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  component="img"
                  height="210"
                  image={vehicle.imagepath}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginLeft: '500px', marginTop: '-1px' }}>
                      <Tooltip title='EDIT VEHICLE'>
                        <IconButton ><EditIcon onClick={() => handleEditOpen(vehicle.id)} style={{ color: 'blue' }} /></IconButton>
                      </Tooltip>
                      <Tooltip title='DELETE VEHICLE'>
                        <IconButton><DeleteIcon onClick={() => handleDelete(vehicle.id)} style={{ color: 'red' }} /></IconButton>
                      </Tooltip>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>

                      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <h4 style={{ marginLeft: '10px', marginBottom: '0rem', marginTop: '0rem' }}>{vehicle.vehiclename}</h4>
                      </div>

                      <CardActions >
                        {/* Edit Vehicle Details*/}
                        <Modal
                          id={`vehicle-modal-${vehicle.id}`}
                          open={editopen[vehicle.id]}
                          onClose={handleEditClose}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                        >
                          <Box sx={style}  >
                            <Typography id="modal-modal-title" variant="h6" component="h2" >
                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'centre', gap: '130px', marginTop: '-25px' }}>
                                <h3>Edit Vehicle</h3>
                                <IconButton onClick={handleEditClose}><CancelIcon /></IconButton>
                              </div>

                            </Typography>
                            <Divider />
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                              <div className='overlaycontent'>
                                {
                                  <form>
                                    <FormControl>
                                      <FormLabel><b>Vehicle Image</b></FormLabel>
                                      <img src={`${vehicle.imagepath}`} alt="Uploaded Image" style={{ maxWidth: '90%', maxHeight: '200px' }} />
                                      <br />
                                      <Button variant="outlined" component="label" startIcon={<FileUploadIcon />}>
                                        <input type="file" onChange={handleImage} /></Button>
                                    </FormControl>

                                    <FormControl>
                                      <FormLabel sx={{ mt: 2 }}><b>Vehicle Name</b></FormLabel>
                                      <TextField
                                        className="formsInput"
                                        id="outlined-size-small vehiclename"
                                        size="small"
                                        type="text"
                                        name='vehiclename'
                                        defaultValue={`${vehicle.vehiclename}`}
                                        value={vehicleData.vehiclename}
                                        onChange={(e) => handleEditChange(e, vehicle.id)}
                                        placeholder="Enter Vehicle Name"
                                        variant="outlined"
                                      />
                                    </FormControl>

                                    <FormControl>
                                      <FormLabel sx={{ mt: 2 }}><b>Model year</b></FormLabel>
                                      <TextField className="formsInput"
                                        id="outlined-size-small year"
                                        size="small"
                                        type="text"
                                        name='year'
                                        defaultValue={`${vehicle.year}`}
                                        value={vehicleData.year}
                                        onChange={(e) => handleEditChange(e, vehicle.id)}
                                        placeholder="Enter Model year"
                                        variant="outlined"
                                      />
                                    </FormControl>

                                    <FormControl>
                                      <FormLabel sx={{ mt: 2 }}><b>Model</b></FormLabel>
                                      <TextField className="formsInput"
                                        id="outlined-size-small"
                                        size="small"
                                        type="text"
                                        name='model'
                                        defaultValue={`${vehicle.model}`}
                                        value={vehicleData.model}
                                        onChange={(e) => handleEditChange(e, vehicle.id)}
                                        placeholder="Enter Model"
                                        variant="outlined"
                                      />
                                    </FormControl>

                                    <FormControl>
                                      <FormLabel sx={{ mt: 2 }}><b>Version</b></FormLabel>
                                      <TextField className="formsInput"
                                        id="outlined-size-small version"
                                        size="small"
                                        type="text"
                                        name='version'
                                        defaultValue={`${vehicle.version}`}
                                        value={vehicleData.version}
                                        onChange={(e) => handleEditChange(e, vehicle.id)}
                                        placeholder="Enter Version"
                                        variant="outlined"
                                      />
                                    </FormControl>

                                    <FormControl>
                                      <FormLabel sx={{ mt: 2 }}><b>VIN Number</b></FormLabel>
                                      <TextField className="formsInput"
                                        id="outlined-size-small"
                                        size="small"
                                        type="text"
                                        name='vinnumber'
                                        defaultValue={`${vehicle.vinnumber}`}
                                        value={vehicleData.vinnumber}
                                        onChange={(e) => handleEditChange(e, vehicle.id)}
                                        placeholder="Enter VIN Number"
                                        variant="outlined"
                                      />
                                    </FormControl>

                                    <FormControl>
                                      <FormLabel sx={{ mt: 2 }}><b>Notes</b></FormLabel>
                                      <TextField className="formsInput"
                                        id="outlined-size-small"
                                        size="small"
                                        type="text"
                                        name='notes'
                                        defaultValue={`${vehicle.notes}`}
                                        value={vehicleData.notes}
                                        onChange={(e) => handleEditChange(e, vehicle.id)}
                                        placeholder="Write notes"
                                        variant="outlined"
                                      />
                                    </FormControl>

                                    <FormControl>
                                      <FormLabel sx={{ mt: 2 }}><b>Other Attachement</b></FormLabel>
                                      <div style={{ fontSize: '15px', margin: '0 auto', border: '1px solid black', padding: '5px', width: '100%' }}><a href={`${vehicle.attachmentpath}`} target='_blank'>{vehicle.attachmentpath}</a></div>
                                      <br />
                                      <Button variant="outlined" component="label" startIcon={<FileUploadIcon />}>
                                        <input type="file" onChange={handleAttachment} /></Button>
                                    </FormControl>

                                    <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                                      <Button variant="outlined" sx={{ width: '120px', margin: '0rem .9rem' }} color='secondary' style={{ borderColor: 'blue', color: 'blue' }} onClick={handleEditClose}>CANCEL</Button>
                                      <Button onClick={() => handleUpdate(vehicle.id)} variant="contained" sx={{ width: '120px', marginRight: '1rem' }} >UPDATE</Button>
                                    </div>
                                  </form>
                                }
                              </div>
                            </Typography>
                          </Box>
                        </Modal>

                        {/* Delete Vehicle Details*/}
                        <Modal
                          id={`vehicle-modal-${vehicle.id}`}
                          open={deleteConfirmation[vehicle.id]}
                          onClose={handleCancelDelete}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description">
                          <Box sx={style2}>
                            <Typography id="spring-modal-title" variant="h6" component="h2">

                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <IconButton><DeleteForeverIcon style={{ color: 'red', fontSize: '4rem' }} /></IconButton>
                              </div>
                              <h2 style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>Delete Vehicle</h2>
                            </Typography>
                            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
                              <h4 style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>Are you sure you want to delete this vehicle?</h4>

                              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '40px' }}>
                                <Button variant="outlined" sx={{ width: '130px' }} color='secondary' style={{ borderColor: 'blue', color: 'blue' }} onClick={handleCancelDelete}>Cancel</Button>
                                <Button onClick={() => DeleteCard(vehicle.id)} variant="contained" color='primary' style={{ backgroundColor: 'red', color: 'white' }}>Yes, Delete</Button>
                              </div>

                            </Typography>
                          </Box>
                        </Modal>
                      </CardActions>
                    </div>

                  </Typography>

                  {/* LIST*/}
                  <Typography variant="body2" color="text.secondary">
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 600 }} aria-label="simple table">
                        <TableHead >
                          <TableRow style={{ backgroundColor: '#1F70B7' }}>
                            <TableCell ><b>Model year</b></TableCell>
                            <TableCell><b>Model</b></TableCell>
                            <TableCell><b>Version</b></TableCell>
                            <TableCell><b>Vin Number</b></TableCell>
                            <TableCell><b>Notes</b></TableCell>
                            <TableCell><b>Attachments</b></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell>{convertyear(vehicle.year)}</TableCell>
                            <TableCell>{vehicle.model}</TableCell>
                            <TableCell>{vehicle.version}</TableCell>
                            <TableCell>{vehicle.vinnumber}</TableCell>
                            <TableCell>{vehicle.notes}</TableCell>
                            <TableCell><a href={vehicle.attachmentpath} target='_blank'>Click here to view</a></TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Typography>
                </CardContent>

              </CardActionArea>
            </Card>
          ))}
        </Typography>
      </Main>
    </Box>
  );
}
