import { Button, Dialog } from "@mui/material";
import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import { TextField } from "@mui/material";

export default function EditCar(props) {

    // states
    const [open, setOpen] = useState(false);
    const [car, setCar] = useState({
        brand: "",
        model: "",
        color: "",
        fuel: "",
        modelYear: "",
        price: "",
    });

    // functions
    const handleDialogOpen = () => {
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            modelYear: props.params.data.modelYear,
            price: props.params.data.price,
        });
        setOpen(true);
    };

    const handleDialogClose = (event, reason) => {
        setOpen(false);
    };

    const handleSaveCar = () => {
        props.updateCar(car, props.params);
        setCar({
            brand: "",
            model: "",
            color: "",
            fuel: "",
            modelYear: "",
            price: "",
        });
        setOpen(false);
    };
    // return
    // button & dialog
    return (
        <>
            <Button onClick={handleDialogOpen}>Edit</Button>
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>Edit Car</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Brand"
                        variant="standard"
                        value={car.brand}
                        margin="dense"
                        fullWidth
                        onChange={event => setCar({ ...car, brand: event.target.value })}
                    />
                    <TextField
                        label="Model"
                        variant="standard"
                        value={car.model}
                        margin="dense"
                        fullWidth
                        onChange={event => setCar({ ...car, model: event.target.value })}
                    />
                    <TextField
                        label="Color"
                        variant="standard"
                        value={car.color}
                        margin="dense"
                        fullWidth
                        onChange={event => setCar({ ...car, color: event.target.value })}
                    />
                    <TextField
                        label="Fuel"
                        variant="standard"
                        value={car.fuel}
                        margin="dense"
                        fullWidth
                        onChange={event => setCar({ ...car, fuel: event.target.value })}
                    />
                    <TextField
                        label="Model Year"
                        variant="standard"
                        value={car.modelYear}
                        margin="dense"
                        fullWidth
                        onChange={event => setCar({ ...car, modelYear: event.target.value })}
                    />
                    <TextField
                        label="Price"
                        variant="standard"
                        value={car.price}
                        margin="dense"
                        fullWidth
                        onChange={event => setCar({ ...car, price: event.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleSaveCar}>Save</Button>
                    <Button onClick={handleDialogClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}