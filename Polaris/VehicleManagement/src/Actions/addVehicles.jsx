import React, { useState } from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import { FormControl, FormLabel } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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

const Add = ({ handleClose }) => {
    const [Data, setData] = useState({
        vehiclename: '',
        year: '',
        model: '',
        version: '',
        vinnumber: '',
        notes: ''
    });
    const { vehiclename, year, model, version, vinnumber, notes } = Data;
    const [imageFile, setimageFile] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [attachmentFile, setattachmentFile] = useState(null);
    const handleChange = (values) => { setData({ ...Data, [values.target.name]: values.target.value }) };
    const handleImage = (event) => {
        const file = event.target.files[0];
        setimageFile(file);
        console.log(file);
        const reader = new FileReader();
        reader.onload = () => {
            setImageUrl(reader.result);
        };
        reader.readAsDataURL(file);

    };
    const handleAttachment = (event) => {
        const file = event.target.files[0];
        setattachmentFile(file);
        console.log(file);
    };
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
            //setvehicleData(res.data)
            swal("Great !", "Successfully Added !!", "success");
            setTimeout(() => window.location.reload(), 1000)
            dispatch(AddData())
        })
        console.log(vehicleData);
    };
    return (
        <>
            <Box sx={style}  >
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'centre', gap: '80px', marginTop: '-25px' }}>
                        <h3>Add New Vehicle</h3>
                        <IconButton onClick={handleClose}><CancelIcon /></IconButton>
                    </div>
                </Typography>
                <Divider />
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    <div className='overlaycontent'>
                        {
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <FormControl>
                                    <FormLabel><b>Vehicle Image</b></FormLabel>
                                    {imageUrl && (
                                        <img src={imageUrl} alt="Uploaded Image" style={{  maxWidth: '81%', maxHeight: '200px' }} />
                                    )}
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
                                        value={vehiclename}
                                        onChange={handleChange}
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
                                        value={year}
                                        onChange={handleChange}
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
                                        value={model}
                                        onChange={handleChange}
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
                                        value={version}
                                        onChange={handleChange}
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
                                        value={vinnumber}
                                        onChange={handleChange}
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
                                        value={notes}
                                        onChange={handleChange}
                                        placeholder="Write notes"
                                        variant="outlined"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel sx={{ mt: 2 }}><b>Other Attachement</b></FormLabel>
                                    <Button variant="outlined" component="label" startIcon={<FileUploadIcon />}>
                                        <input type="file"
                                            onChange={handleAttachment}
                                        /></Button>
                                </FormControl>

                                <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
                                    <Button variant="outlined" sx={{ width: '120px', margin: '0rem .9rem' }} color='secondary' style={{ borderColor: 'blue', color: 'blue' }} onClick={handleClose}>CANCEL</Button>
                                    <Button type='submit' variant="contained" sx={{ width: '120px', marginRight: '1rem' }} >ADD</Button>
                                </div>
                            </form>
                        }
                    </div>
                </Typography>
            </Box>
        </>
    )

}
export default Add;