import View from "react-native-web/dist/vendor/react-native/Animated/components/AnimatedView";
import {Button, ScrollView, Text, TextArea, TextField, useToast} from "native-base";
import {Dimensions, StyleSheet} from "react-native";

import {useState} from "react";
import {connect} from "react-redux";
import {AddElement} from "../store/action";
import Loading from "../components/Loading";


function AddScreen(props){
    const [nume, setNume] = useState("")
    const [medie1, setMedie1] = useState("")
    const [medie2, setMedie2] = useState("")
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(false)

    const toast = useToast()

    const adaugaElement = async () =>{
        const elementNou = {
            nume,
            medie1: Number(medie1),
            medie2: Number(medie2),
        }
        setLoading(true)
        props.addElement(elementNou)
            .then((result)=> {
                setLoading(false)
                toast.show({
                    description: result,
                })
                setTimeout(()=> {
                    props.navigation.goBack()
                }, 1000)
            })
            .catch(error => {
                setLoading(false)
                toast.show({
                    description: error,
                })
            })
    }
    if(!loading)
    return(
        <ScrollView style={styles.addScreen}>
            <Text>Nume</Text>
            <TextArea value={nume} onChangeText={(e)=>{setNume(e)}} h={10} />
            <Text>Medie1</Text>
            <TextArea value={medie1} onChangeText={(e)=>{setMedie1(e)}} h={10} />
            <Text>Medie2</Text>
            <TextArea value={medie2} onChangeText={(e)=>{setMedie2(e)}} h={10} />
            {/* <Text>Status</Text>
            <TextArea value={status} onChangeText={(e)=>{setStatus(e)}} h={10} /> */}
            <Button onPress={adaugaElement}>Add</Button>
        </ScrollView>
    )
    return <Loading/>
}

const windowHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    addScreen: {
        height: windowHeight/2,
        overflow: "scroll",
        paddingBottom: 20,
    }
})

const mapStateToProps = (state) => {
    return {elements: state.elements}
}
const mapDispatchToProps = (dispatch) => {
    return {addElement:AddElement(dispatch)}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddScreen)