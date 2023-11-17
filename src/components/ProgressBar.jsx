
/* Reference ProgressBar https://www.geeksforgeeks.org/how-to-create-a-custom-progress-bar-component-in-react-js/# */

const ProgressBar = ({progress}) => {

    const Parentdiv = {
        width: '25%',
        backgroundColor: 'whitesmoke',
        borderRadius: 40,
      }
     
      const Childdiv = {
        width: `${progress}%`,
        backgroundColor: "#0d99ff",
        borderRadius:40,
        textAlign: 'right'
      }
     
      const progresstext = {
        fontFamily: "Lucida Console", 
        color: 'black',
        fontWeight: 'bold'
      }
       
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}>{`${progress}%`}</span>
      </div>
    </div>
    )
}
 
export default ProgressBar;