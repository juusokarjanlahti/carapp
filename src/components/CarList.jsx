import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { Button, Snackbar } from "@mui/material";
import AddCar from "./AddCar";
import EditCar from "./EditCar";

export default function CarList() {
    // state variable to hold the list of cars
    const [cars, setCars] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [msg, setMsg] = useState("");

    // get the list of cars from the REST API
    const getCars = () => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data._embedded && data._embedded.cars) {
                setCars(data._embedded.cars);
            } else {
            console.error("Check the data format from the API");
            }
        })
        .catch(err => {
            console.error(err);
        });
    };

    // default column definition
    const defaultColDef = {
        flex: 1,
        filter: true,
        floatingFilter: true,
        editable: true,
    };

    // ag-grid column definitions
    const [colDefs] = useState([
        { field: "brand" },
        { field: "model" },
        { field: "color" },
        { field: "fuel" },
        { field: "modelYear"},
        { field: "price", valueFormatter: params => params.value.toLocaleString() + "€" },
        {
            cellRenderer: (params) => 
            <EditCar params={params} updateCar={updateCar}/>
        },
        {
            cellRenderer: (params) =>
                <Button
                    size="small"
                    color="error"
                    onClick={() => deleteCar(params)}
                >Delete</Button>
        }
    
    ]);

    // save a car, REST API POST method
    // pass the car object to the function
    const saveCar = (car) => {
        fetch('https://car-rest-service-carshop.2.rahtiapp.fi/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            })
            .then(response => {
                if (response.ok) {
                    setOpenSnackbar(false);
                    setMsg("Car added successfully");
                    getCars();
                }
                else {
                    setOpenSnackbar(true);
                    setMsg("Error in adding car");
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    // delete a car, REST API DELETE method
    const deleteCar = (params) => {
        console.log("params ", params.data._links.car.href);
        fetch(params.data._links.car.href,
            { method: 'DELETE' })
            .then(response => {
                if (response.ok) {
                    setOpenSnackbar(true);
                    setMsg("Delete succeed");
                    getCars();
                }
                else {
                    openSnackbar(false);
                }
            })
            .catch(err => {
                console.error(err);
                setOpenSnackbar(true);
                setMsg("Error in deleting car");
            });
        }

    const updateCar = (updatedCar, params) => {
        console.log("car" + updateCar);
        fetch(params.data._links.car.href,{
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedCar)
        })
        .then(response => {
            if (response.ok) {
                setOpenSnackbar(false);
                setMsg("Update succeed");
                getCars();
            }
            else {
                setOpenSnackbar(true);
                setMsg("Update failed");
            }
        }
        )
            .catch(err => {
                console.error(err);
                setOpenSnackbar(true);
                setMsg("Error in updating car");
            }
        );
    }

    useEffect(() => getCars(), [])



    return (
        <>
            <AddCar saveCar={saveCar} />
            <div className="ag-theme-material" style={{ width: 900, height: 400 }}>
                <AgGridReact
                    rowData={cars}
                    columnDefs={colDefs}
                    defaultColDef={defaultColDef}
                    pagination={true}
                    paginationPageSize={5}  // default page size
                    paginationPageSizeSelector={[5, 10, 20]} // page size options
                    sortingOrder={["asc", "desc"]}
                    rowSelection={"multiple"}
                >
                </AgGridReact>
            </div>
                <Snackbar
                    open={openSnackbar}
                    message={msg}
                    autoHideDuration={3000}
                    onClose={() => setOpenSnackbar(false)}
                />
        </>
    );
}
