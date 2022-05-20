import {Field, Form, Formik} from "formik";
import React, {useEffect, useRef, useState} from "react";
import {Box, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {Place} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {useClickOutSideClose} from "../../Hooks/useClickOutSideClose";

interface MyFormValues {
    firstName: string;
    lastName: string;
    cpf: string;
    email: string;
    address:string
}
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
    q: "",
    format: "json",
    addressdetails: "addressdetails",
};

export const FormUser = () => {
    const dispatch = useDispatch();
    const places = useSelector((state: any) => state.adressInfo);
    const [searchText, setSearchText] = useState("");
    const [close , setClose] = useState(false)
    const ref = useRef(null);
    const [listPlace, setListPlace] = useState([]);
    const initialValues: MyFormValues = { firstName: '', lastName: '', cpf: '', email: '',address:'' };
    useClickOutSideClose(ref, () => setClose(false));


    const handleGetLocation = async ()=>{
        const params:any = {
            q: searchText,
            format: "json",
            addressdetails: 1,
            polygon_geojson: 1,
        };
        const queryString = new URLSearchParams(params).toString();
        const requestOptions:any = {
            method: "GET",
            redirect: "follow",
        };
        await fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
            .then((response) => response.text())
            .then((result) => {
                console.log(JSON.parse(result));
                setListPlace(JSON.parse(result));
            })
            .catch((err) => console.log("err: ", err));
    }

    useEffect(() => {
        if(searchText){
            handleGetLocation();
        }
    }, [searchText])


    return(
        <Formik
            initialValues={initialValues}
            onSubmit={(values, actions) => {
                actions.setFieldValue('address', places?.display_name||searchText)
                alert(JSON.stringify(values, null, 2));
                actions.setSubmitting(true);
            }}
        >
            <Form style={{display: 'flex', flexDirection: 'column' , gap:'10px', padding:'50px' }} method="get" action="/dfsf" >
               <h1 style={{alignSelf:'center'}}>Fisgar Locator System</h1>
                <Box style={{display:'flex',flexDirection: 'row',width:'100%', gap:'10px'}}>
                    <Box style={{display:'flex',flexDirection: 'column', width:'50%'}}>
                        <label htmlFor="firstName">FIRST NAME</label>
                        <Field id="firstName" name="firstName" className={'input'} />
                    </Box>
                    <Box style={{display:'flex',flexDirection: 'column', width:'50%'}}>
                        <label htmlFor="lastName">LAST NAME</label>
                        <Field id="lastName"  name="lastName" className={'input'}/>
                    </Box>
                </Box>
                <Box style={{display:'flex',flexDirection: 'row', width:'100%', gap:'10px'}}>
                    <Box style={{display:'flex',flexDirection: 'column', width:'50%'}}>
                        <label htmlFor="cpf">CPF</label>
                        <Field id="cpf" name="cpf" className={'input'}/>
                    </Box>
                    <Box style={{display:'flex',flexDirection: 'column', width:'50%', position: 'relative'}}>
                        <label htmlFor="address">ADDRESS</label>
                        <Field id="address" name="address" className={'input'} value={searchText} onChange={({target}:any)=>setSearchText(target.value)}/>
                        <List style={{
                            display: !searchText ? 'none':'',
                            width: '100%',
                            position:'absolute',
                            top:45,
                            height:'200px',
                            backgroundColor:'#efe',
                            border:'1px solid #000',
                            overflowY: 'scroll',
                            zIndex:'99999'
                        }}
                        ref={ref}>
                            {listPlace.map((place:any)=><ListItem button key={place.place_id} onClick={() => {
                                dispatch({ type: 'set', adressInfo: place })
                                setSearchText(places.display_name|| '')
                                }}>
                                <ListItemIcon>
                                    <Place style={{color: 'red'}}/>
                                </ListItemIcon>
                                <span
                                    title={place.display_name}
                                    style={
                                    {
                                        maxWidth:'70%',
                                        overflow: 'hidden',
                                        lineBreak:'strict',
                                        height: '20px'
                                    }
                                }>
                                    {place.display_name}
                                </span>
                            </ListItem>)}
                        </List>
                    </Box>
                </Box>

                <Box style={{display:'flex',flexDirection: 'column'}}>
                    <label htmlFor="email">E-MAIL</label>
                    <Field id="email" name="email"  type="email" className={'input'}/>
                </Box>
                <button type="submit">Submit</button>
            </Form>
        </Formik>
    )

};
