import React, { Component , useState , useEffect , useLayoutEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import { Details } from '@material-ui/icons';
import { Paper, StylesProvider } from '@material-ui/core';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import demoData from '../../../../../data/demoData';
import { update } from 'lodash';
import PictureAsPdfRoundedIcon from '@material-ui/icons/PictureAsPdfRounded';
import ImageIcon from '@material-ui/icons/Image';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getStorage, ref , uploadBytes ,uploadBytesResumable, getDownloadURL} from "firebase/storage";
import { doc, setDoc ,collection, addDoc, getFirestore, updateDoc, arrayUnion} from "firebase/firestore"; 
import storage from '../../../../../util/getStorage';
import db from '../../../../../util/getFireStore';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root:{
        flexGrow : 1,
        marginLeft : '20%'
    },
    box:{
        maxheight : '30%',
        width : '73%',
        backgroundColor: '#ebe6e6',
        borderRadius : 20,
        paddingLeft : '25px',
        paddingRight : '25px',
        paddingBottom : '25px',
        paddingTop : '25px',
        marginLeft : '33px'
    },
    field:{
        height : '100%',
        width : '100%'
    },
    input:{
        display: 'none',
    },
    padder:{
        display : 'flex',
        flexDirection : 'row',
        //backgroundColor : 'green'
    },
    button_showdown:{
        display : 'flex',
        flexDirection : 'row',
        // backgroundColor : 'red'

    },
    send_button:{
        display : 'flex',
        // backgroundColor : 'blue',
        marginLeft : '98ch'
    },
    send_button_container:{
        marginTop : '35%'
    },
    button_showdown_container:{
        // display : 'flex',
        // flexDirection : 'row',
        marginTop : '-20%',
        backgroundColor : '#00000'
    },
    button_design:{
        backgroundColor : '#c1cee3'
    },
    progress_bar :{
        minWidth : '40ch',
        backgroundColor:'red'
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    
}));

let storageKey, pdflink = "", imagelink = "", videolink = "", isUploaded = false;
    let postTime;

function PostBox({user_details , classDetails , setClassDetails}) {

    // console.log("dhorte parbi na");
    const selectedCode = classDetails.code_class;

    const style = useStyles();

    // let storageKey, pdflink = "", imagelink = "", videolink = "", isUploaded = false;
    // let postTime;
    
    const [post, setpost] = useState();
    const [selectedimage, setselectedimage] = useState("");
    const [selectedvideo, setselectedvideo] = useState("");
    const [selectedpdf, setselectedpdf] = useState("");
    
    // const [time, settime] = useState("")
    // const [storageKey, setStorageKey] = useState("")
    
    // const [pdflink, setPdflink] = useState("");
    // const [imagelink, setImagelink] = useState("");
    // const [videolink, setVideolink] = useState("");
    const [open, setOpen] = React.useState(false);

    // const [isLoadingInterfaceOpen, setIsLoadingInterfaceOpen] = useState(false)

    // const [progressImage, setProgressImage] = useState(10);
    // const [progressPdf, setProgressPdf] = useState(10);
    // const [progressVideo, setProgressVideo] = useState(10);

    const post_fake_pdf = "https://firebasestorage.googleapis.com/v0/b/final-3200.appspot.com/o/classes%2Ffake_materials%2Fuuser.pdf?alt=media&token=e7a3fc30-fb62-4d87-a19f-e0a4712129f7";
    const post_fake_video = "https://firebasestorage.googleapis.com/v0/b/final-3200.appspot.com/o/classes%2Ffake_materials%2Fvideo-642751d4-c1ca-4098-9244-5eb896ae5f62-1662140135.mp4?alt=media&token=78dae853-5c26-45ce-9e43-60cf608f9560";
    const post_fake_image = "https://firebasestorage.googleapis.com/v0/b/final-3200.appspot.com/o/classes%2Ffake_materials%2F302081207_5665356146860830_5457459837241251504_n.png?alt=media&token=cc48efcb-d9dd-4b99-817a-2ffc2ddda180";


    // useEffect(() => {
    //     if((pdflink !== "") && (imagelink !== "") && (videolink !== "")){
    //         console.log("Confirmed !!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    //         setIsLoadingInterfaceOpen(false);
    //         handleClickOpen();
    //     }
        
    // }, [pdflink,imagelink,videolink])

    // const handleClickOpen =  () => {
    //     setOpen(true);
    // };

    const confirmPostMaterials = () =>{
        setOpen(false);
        saveDocs()

    }

    const handleClose = () => {
        setOpen(false);
    }


    const saveDocs = async () => {

        const materialRef = doc(db , "class_codes" , selectedCode);
        
        const real_obj = {
                post_user : user_details.name,
                post_time : postTime,
                post_user_icon : "",
                post_text : post,
                post_pdf : pdflink,
                post_video : videolink,
                post_image : imagelink,
                post_key : storageKey,
                class_code : selectedCode
        };
        
        const fake_obj ={
                post_user : user_details.name,
                post_time : postTime,
                post_user_icon : "",
                post_text : "You are not allowed to see this content. Get authorised first",
                post_pdf : post_fake_pdf,
                post_video : post_fake_video,
                post_image : post_fake_image,
                post_key : storageKey,
                class_code : selectedCode
        };

        console.log(real_obj);
        console.log(fake_obj);

        await updateDoc(materialRef , {
            class_materials : arrayUnion(real_obj),
            fake_class_materials : arrayUnion(fake_obj)
        })

        let tempArray = classDetails.class_materials;
        tempArray.push(real_obj);

        setClassDetails({...classDetails,class_materials : tempArray});

        setpost("");
        // setOpen(false);
    };

    const handleText = (e) => {
        setpost(e.target.value);
    }

    const handleImage = e =>{
        setselectedimage(e.target.files[0]);
    }

    const handlePdf = e =>{
        setselectedpdf(e.target.files[0]);
    }

    const handleVideo = e =>{
        setselectedvideo(e.target.files[0]);
    }
    
    const formatAMPM = () =>{
        var date = new Date();
        const MonName = [
            "" , "Jan" , "Feb" , "Mar" , "Apr" , "May" , "Jun" , "Jul" , "Aug" , "Sep" , "Oct" , "Nov" , "Dec" 
        ]
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var dateNo = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();
        
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm + " on " + dateNo + " " + MonName[month] + ',' + year;
        var key_to_media_storage = '_' + year + month + dateNo + hours + minutes + ampm;
        storageKey = key_to_media_storage
        postTime = strTime;
        console.log(storageKey);
        // setStorageKey(key_to_media_storage);
        // post_details.post_key = key_to_media_storage;
        // post_details.post_time = strTime;
        // console.log(storageKey);
        // settime(strTime);

    }

    // const uploadVideo = async() =>{
    //     var path;
    //     path = 'classes' + '/' + selectedCode + '/' + storageKey + '/' + 'video' + '/' + selectedimage.name ;
    //     const storageRef = ref(storage, path);
    //     try{
    //         await uploadBytes(storageRef, selectedvideo)
    //         const url = await getDownloadURL(ref(storage, path))
    //         setVideolink(url);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // const uploadPdf = async() =>{
    //     var path;
    //     path = 'classes' + '/' + selectedCode + '/' + storageKey + '/' + 'pdf' + '/' + selectedpdf.name ;
    //     const storageRef = ref(storage, path);
    //     try{
    //         await uploadBytes(storageRef, selectedpdf)
    //         const url = await getDownloadURL(ref(storage, path))
    //         setPdflink(url);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // const uploadImage = async() =>{
    //     var path;
    //     path = 'classes' + '/' + selectedCode + '/' + storageKey + '/' + 'image' + '/' + selectedimage.name ;
    //     const storageRef = ref(storage, path);
    //     try{
    //         await uploadBytes(storageRef, selectedimage)
    //         const url = await getDownloadURL(ref(storage, path))
    //         setImagelink(url);
    //     }catch(error){
    //         console.log(error);
    //     }
    // }

    // /// this buddy is defined outside to confirm the rendering of the state values

    // const confirmPostMaterials = () =>{
    //     handleClose();
    // }

    const uploadMedia = async () =>{

        var path;
        let link = "";
        path = 'classes' + '/' + selectedCode + '/' + storageKey + '/' + 'video' + '/' + selectedimage.name ;
        const storageRef1 = ref(storage, path);
        try{
            await uploadBytes(storageRef1, selectedvideo)
            link  = await getDownloadURL(ref(storage, path))
            videolink = link;
            // console.log("v");
        } catch(error) {
            console.log(error);
        }

        path = 'classes' + '/' + selectedCode + '/' + storageKey + '/' + 'pdf' + '/' + selectedpdf.name ;
        const storageRef2 = ref(storage, path);
        try{
            await uploadBytes(storageRef2, selectedpdf)
            pdflink = await getDownloadURL(ref(storage, path))
            // setPdflink(url);
            console.log("P");
        } catch(error) {
            console.log(error);
        }

        path = 'classes' + '/' + selectedCode + '/' + storageKey + '/' + 'image' + '/' + selectedimage.name ;
        const storageRef3 = ref(storage, path);
        try{
            console.log(await uploadBytes(storageRef3, selectedimage)); 
            imagelink = await getDownloadURL(ref(storage, path))
            // setImagelink(url);
            imagelink = imagelink.toString()
            console.log(imagelink);
            // console.log("i");
        } catch(error) {
            console.log(error);
        }
        setOpen(true);
        isUploaded = true
        console.log("loading is done");
    }

    // const Add_post = () =>{
    //     console.log("startted");
    //     // uploadMedia();
    //     console.log("Stopped");
        
    //     // handleClickOpen();
    // }

    const Add_p = (e) => {
        e.preventDefault();
        formatAMPM();
        uploadMedia();
        PopUp()
        // handleClose();
        // confirmPostMaterials();
        // console.log(isLoadingInterfaceOpen);
        // setIsLoadingInterfaceOpen(true);
        // alert('While laoding please be patient');
        // Add_post();

    }

    // const LoadingInterface = () =>{
    //     return(
    //         <Backdrop open={isLoadingInterfaceOpen} onClick = {() => {setIsLoadingInterfaceOpen(false)}}>
    //             <label>While loading please be patient</label>
    //         </Backdrop>
    //     );
    // }

    const PopUp = () =>{
        console.log(open);
        return(
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Request for clearance"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        By pressing <b>"CONFIRM"</b> you are going add these new class materials to your class
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Discard
                    </Button>
                    <Button onClick={confirmPostMaterials} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }

    return(
        <div className = {style.root}>
            <PopUp />
            <form className={style.box} noValidate autoComplete="off" onSubmit = {Add_p} >
                <TextField
                    className = {style.field}
                    label="Say Something to the class"
                    variant="filled"
                    rows = {5}
                    multiline
                    value = {post}
                    onChange = {handleText}
                />
                <br/>
                <br/>
                <div className = {style.padder}>
                    <div className = {style.send_button}>
                        <div className = {style.send_button_container}>
                            <div className = {style.button_showdown}>
                                <div className = {style.button_showdown_container}>
                                    <div>
                                        <input
                                            id="pdf"
                                            accept = "application/pdf"
                                            type="file"
                                            className={style.input}
                                            multiple
                                            onChange = {handlePdf}
                                        />
                                        <label htmlFor="pdf" >
                                            <PictureAsPdfRoundedIcon/>
                                        </label>
                                    </div>
                                </div>
                                <div className = {style.button_showdown_container}>
                                    <div>
                                        <input
                                            id="video"
                                            accept="video/*"
                                            type="file"
                                            className={style.input}
                                            multiple
                                            onChange = {handleVideo}
                                        />
                        
                                        <label htmlFor="video" >
                                            <VideoLibraryIcon/>
                                        </label>
                                    </div>
                                </div>
                                <div className = {style.button_showdown_container}>
                                    <div>
                                        <input
                                            id="image"
                                            accept="image/*"
                                            type="file"
                                            className={style.input}
                                            multiple
                                            onChange = {handleImage}
                                        />
                        
                                        <label htmlFor="image" >
                                            <ImageIcon/>
                                        </label>
                                    </div>
                                </div>
                            </div>
                                <Button
                                    variant="contained"
                                    className = {style.button_design }
                                    endIcon = { <SendIcon/> }
                                    type = "submit"
                                    size = "large"
                                >
                                    Post
                                </Button>
                                
                            </div>
                        </div>
                </div>
            </form> 
        </div>
    );
}
export default PostBox;
// lines from 374 to 461
