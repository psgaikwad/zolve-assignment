import React from 'react'
import { withStyles } from '@material-ui/styles'
import MuiSnackbarContent from '@material-ui/core/SnackbarContent'
import { Snackbar, Typography } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import {amber, green, blue, red} from '@material-ui/core/colors'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import InfoIcon from '@material-ui/icons/Info'
import ErrorIcon from '@material-ui/icons/Error'
import WarningIcon from '@material-ui/icons/Warning'
import CloseIcon from '@material-ui/icons/Close'


const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const SnackbarContent = withStyles({
    root:{
        '&.success':{
            backgroundColor: green[500]
        },
        '&.error':{
            backgroundColor: red[500]
        },
        '&.warning':{
            backgroundColor: amber[500]
        },
        '&.info':{
            backgroundColor: blue[500]
        }
    }
})(MuiSnackbarContent);


function alertsWrapper(WrappedComponent){
    return class extends React.PureComponent{
        constructor(props){
            super(props);

            this.state = {
                open: true,
                message: '',
                variant: 'success',
                autoHideDuration: 5000
            }
        }

        handleOpen = (msg, variant, duration) => {
            this.setState({
                open : true,
                message: msg,
                variant: variant,
                autoHideDuration: duration?duration:5000
            })
        }

        handleClose = () => {
            this.setState({
                open : false
            })
        }

        render(){
            
            const Icon = variantIcon[this.state.variant];

            return(
                <React.Fragment>
                    <WrappedComponent {...this.props}  openAlert={this.handleOpen}/>

                    <Snackbar 
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        open={this.state.open}
                        autoHideDuration={this.state.autoHideDuration}
                        onClose={this.handleClose}
                    >
                        <SnackbarContent
                            className={this.state.variant}
                            message={
                                <span>
                                    <Typography display="inline" variant="body1"> 
                                        <Icon className={this.state.variant} style={{verticalAlign: 'bottom', marginRight: '10px'}}/> 
                                        {this.state.message}
                                    </Typography>
                                </span>
                            }
                            action={[
                                <IconButton key="close" color="inherit" onClick={this.handleClose} >
                                    <CloseIcon  />
                                </IconButton>,
                            ]}
                            />
                    </Snackbar>
                </React.Fragment>
            )
        }
    }
}

export default alertsWrapper;
