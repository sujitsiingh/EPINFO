import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography';
import * as api from '../../api/index';
import AddAlert from "@material-ui/icons/AddAlert";
import Snackbar from "../../components/Snackbar/Snackbar.js";
import Chart from 'react-google-charts';
import GridContainer from '../../components/Grid/GridContainer';
import GridItem from '../../components/Grid/GridItem';

const Contact = () => {

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [message, setMessage] = useState();
    const [notif, setNotif] = useState({ open: false, message: "", color: "info" });

    const errorNotification = (error) => {
        var response = error.response?.data;
        setNotif({ open: true, color: "danger", message: response?.message ? response.message : "Something went wrong!" });
        setTimeout(function () {
            setNotif({ open: false, message: "" });
        }, 5000);
    }

    const successNotification = (response) => {
        var data = response?.data;
        if (response.data.success) {
            setNotif({ open: true, color: "success", message: data.message });
            setTimeout(function () {
                setNotif({ open: false, message: "" });
            }, 5000);
        } else {
            setNotif({ open: true, color: "danger", message: data.message ? data.message : "Something went wrong! Refresh the page and try again." });
            setTimeout(function () {
                setNotif({ open: false, message: "" });
            }, 5000);
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        api.contactForm({
            name: name,
            email: email,
            message: message,
        }).then((response) => {
            successNotification(response);
        }).catch((error) => {
            errorNotification(error);
        });

    }

    return (
        <div class="contact">
            <Snackbar
                place="bl"
                color={notif.color}
                icon={AddAlert}
                message={notif.message}
                open={notif.open}
                closeNotification={() => setNotif({ open: false, message: "" })}
                close
            />
            <div style={{ overflowX: 'clip', padding: '4rem 1rem' }}>
                <div style={{ marginBottom: '3rem' }}>
                    <Typography variant="h4" align="center">
                        Epidemics of the World Statistics
                    </Typography>
                </div>
                <GridContainer>
                    <GridItem xs={12} sm={1}></GridItem>
                    <GridItem xs={12} sm={5}>
                        <Chart
                            height={"300px"}
                            chartType="AreaChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Disease", "Cases", "Deaths"],
                                ["Ebola", 6325462, 2555444],
                                ["HIV/AIDS", 102742880.0, 2748730.0],
                                ["Malaria", 666438730.0, 2159768.0],
                                ["H1N1", 973183, 5289],
                                ["Cholera", 9180678, 897204],
                            ]}
                            options={{
                                title: "Epidemics' cases and deaths Area chart",
                                vAxis: { logScale: true }
                            }}
                            legendToggle
                        />
                    </GridItem>
                    <GridItem xs={12} sm={5}>
                        <Chart
                            height={"300px"}
                            chartType="ColumnChart"
                            loader={<div>Loading Chart...</div>}
                            data={[
                                ["Disease", "Cases", "Deaths"],
                                ["Ebola", 6325462, 2555444],
                                ["HIV/AIDS", 102742880.0, 2748730.0],
                                ["Malaria", 666438730.0, 2159768.0],
                                ["H1N1", 973183, 5289],
                                ["Cholera", 9180678, 897204],
                            ]}
                            options={{
                                title: "Epidemics' cases and deaths Column chart",
                                vAxis: { logScale: true }
                            }}
                            legendToggle
                        />
                    </GridItem>
                    <GridItem xs={12} sm={1}></GridItem>
                </GridContainer>
                <p style={{ textAlign: 'center', color: 'grey', marginTop: '2rem' }}><i>“Transparency is critical in public health and epidemics; laypeople become either effective force-multipliers or stubborn walls.”</i></p>
            </div>

            <div className="background">
                <div class="container">
                    <div class="modal">
                        <form id="my-form" onSubmit={handleSubmit}>
                            <Typography variant="h3" align="center">
                                Contact
                            </Typography>
                            <div>
                                <div>
                                    <div>
                                        <label style={{ color: 'black' }}>Name *</label>
                                        <input type="text" className="w-input" onChange={handleNameChange} name="Name" id="Name" required />
                                    </div>
                                    <div>
                                        <label style={{ color: 'black' }}>Email *</label>
                                        <input type="email" className="w-input" onChange={handleEmailChange} name="Email" id="Email" required />
                                    </div>
                                </div>
                                <div>
                                    <label style={{ color: 'black' }}>Message *</label>
                                    <textarea name="Message" id="Message" onChange={handleMessageChange} className="w-textarea" required></textarea>
                                </div>
                                <input type="submit" value="SUBMIT" data-wait="Please wait..." className="submit-button" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Contact
