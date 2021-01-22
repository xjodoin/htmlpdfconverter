import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Copyright from '../src/Copyright';
import Link from '../src/Link';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    Avatar,
    Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    makeStyles,
    MenuItem,
    Select
} from "@material-ui/core";
import {PrintOutlined} from "@material-ui/icons";

const validationSchema = yup.object({
    // email: yup
    //     .string('Enter your email')
    //     .email('Enter a valid email')
    //     .required('Email is required'),
    url: yup
        .string('Enter your website url')
        .matches(
            /((https?):\/\/)+(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        )
        .required('Website url is required'),
});


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    formControl: {
        margin: theme.spacing(1),
    },
}));

export default function Index() {

    const [result, setResult] = useState('');

    const formik = useFormik({
        initialValues: {
            url: '',
            format: 'letter',
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {

            const response = await fetch('api/htmltopdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            }).then(response => response.json());

            setResult(response.pdf)
        },
    });

    const classes = useStyles();

    const handleClose = () => {
        setResult('');
    };

    return (
        <Container component="main" maxWidth="xs">
            <Dialog
                open={!!result}
                onClose={handleClose}
            >
                <DialogTitle>{"Your pdf is ready to download!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        The following link is available for 24h.
                    </DialogContentText>
                    <Link target={'_blank'} href={result} color="secondary">
                        Download
                    </Link>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PrintOutlined/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Generate PDF
                </Typography>
                <form className={classes.form} onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="url"
                                label="Website url"
                                name="url"
                                value={formik.values.url}
                                onChange={formik.handleChange}
                                error={formik.touched.url && Boolean(formik.errors.url)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth className={classes.formControl}>
                                <InputLabel id="format-label">Format</InputLabel>
                                <Select
                                    labelId="format-label"
                                    name="format"
                                    value={formik.values.format}
                                    onChange={formik.handleChange}
                                    error={formik.touched.format && Boolean(formik.errors.format)}
                                >
                                    <MenuItem value={'letter'}>Letter</MenuItem>
                                    <MenuItem value={'legal'}>Legal</MenuItem>
                                    <MenuItem value={'tabloid'}>Tabloid</MenuItem>
                                    <MenuItem value={'ledger'}>Ledger</MenuItem>
                                    <MenuItem value={'a0'}>A0</MenuItem>
                                    <MenuItem value={'a1'}>A1</MenuItem>
                                    <MenuItem value={'a2'}>A2</MenuItem>
                                    <MenuItem value={'a3'}>A3</MenuItem>
                                    <MenuItem value={'a4'}>A4</MenuItem>
                                    <MenuItem value={'a5'}>A5</MenuItem>
                                    <MenuItem value={'a6'}>A6</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        {/*<Grid item xs={12} sm={6}>*/}
                        {/*    <TextField*/}
                        {/*        autoComplete="fname"*/}
                        {/*        name="firstName"*/}
                        {/*        variant="outlined"*/}
                        {/*        fullWidth*/}
                        {/*        id="firstName"*/}
                        {/*        label="First Name"*/}
                        {/*        value={formik.values.firstName}*/}
                        {/*        onChange={formik.handleChange}*/}
                        {/*        error={formik.touched.firstName && Boolean(formik.errors.firstName)}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12} sm={6}>*/}
                        {/*    <TextField*/}
                        {/*        variant="outlined"*/}
                        {/*        fullWidth*/}
                        {/*        id="lastName"*/}
                        {/*        label="Last Name"*/}
                        {/*        name="lastName"*/}
                        {/*        autoComplete="lname"*/}
                        {/*        value={formik.values.lastName}*/}
                        {/*        onChange={formik.handleChange}*/}
                        {/*        error={formik.touched.lastName && Boolean(formik.errors.lastName)}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        {/*    <TextField*/}
                        {/*        variant="outlined"*/}
                        {/*        fullWidth*/}
                        {/*        id="email"*/}
                        {/*        label="Email Address"*/}
                        {/*        name="email"*/}
                        {/*        autoComplete="email"*/}
                        {/*        value={formik.values.email}*/}
                        {/*        onChange={formik.handleChange}*/}
                        {/*        error={formik.touched.email && Boolean(formik.errors.email)}*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                        {/*<Grid item xs={12}>*/}
                        {/*    <FormControlLabel*/}
                        {/*        control={<Checkbox value="allowExtraEmails" color="primary"/>}*/}
                        {/*        label="I want to receive updates and marketing promotions via email."*/}
                        {/*    />*/}
                        {/*</Grid>*/}
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Generate PDF
                    </Button>
                </form>
            </div>
            <Box mt={5}>
                <Copyright/>
            </Box>
        </Container>
    );
}
