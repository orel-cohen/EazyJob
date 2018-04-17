import { StyleSheet } from 'react-native';

let _bg  = '#2d2833'
let _txt = '#d3d2d6'


const MyStyles = {

    // Text:
    header: {
        padding: 5,
        color: _txt,
    },

    Title: {

    },

    input: {
        width: 300,
        height: 45,
        backgroundColor: _bg,//'rgba(255,255,255,0.2)',
        marginBottom: 20,
        color: _txt,//'#FFF',
        paddingHorizontal: 10,
        
      },

    // Buttons:
    buttonText:{
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: '700',
        paddingHorizontal: 20,
    },

    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 14,
    },

    signupStyle: {
        color: 'rgba(255,255,255,1)',
        fontWeight: '700',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },

    // Conteiners:
    loginContainer: {
        flex:1,
        backgroundColor: '#3498db',
        alignItems: 'center',
        justifyContent: 'flex-end',
        // flexDirection: 'column'
    },
    titleContainer: {
        paddingVertical:150, 
        fontSize: 30,
        fontWeight: 'bold',
        color:'#FFF'
        //alignContent: 'space-between',
    },
    container: {
        padding: 15,
        //alignItems:'center',
        //justifyContent:'flex-end',
       // flexDirection: 'column'
    },

    //LOGO:
    logoStyle: {
        alignContent:'center',
        justifyContent: 'center',
       width: 120,
        height: 140,
    },
};

export default MyStyles;