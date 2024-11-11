import { TextField } from "@mui/material";
import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export default function AddCar(props) {
    const [open, setOpen] = useState(false); // isDialogOpen ?
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: "",
        price: "",
    });

    const handleChange = (e) => {
        setCar({ ...car, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        props.saveCar(car);
        setOpen(false);
    };

    return (
        <>
            <Button variant="outlined" color="primary" onClick={() => setOpen(true)}>
                Add Car
            </Button>
            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Add New Car</DialogTitle>
                <DialogContent>
                    <TextField name="brand" label="Brand" variant="standard" value={car.brand} onChange={handleChange} fullWidth />
                    <TextField name="model" label="Model" value={car.model} onChange={handleChange} fullWidth />
                    <TextField name="color" label="Color" value={car.color} onChange={handleChange} fullWidth />
                    <TextField name="fuel" label="Fuel" value={car.fuel} onChange={handleChange} fullWidth />
                    <TextField name="modelYear" label="Year" value={car.modelYear} onChange={handleChange} fullWidth />
                    <TextField name="price" label="Price" value={car.price} onChange={handleChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}