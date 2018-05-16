import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    container: {
        backgroundColor: '#3498db',
        padding: 15,
        alignItems:'center',
        justifyContent:'flex-end',
    },
    input: {
      width: 300,
      height: 45,
      backgroundColor: 'rgba(255,255,255,0.8)',
      marginBottom: 12,
     // color: 'rgba(0,0,0,1)',
      paddingHorizontal: 10,
    },
    buttonText:{
       color: 'rgba(0,0,0,1)',
        textAlign: 'center',
        fontWeight: '700'
        
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingVertical: 15
    },  
    TextStyle:{
     fontSize: 23,
     textAlign: 'center',
     color: '#000',
  },
  error:{
    borderWidth:2,
    borderColor:'red'
    }
  });