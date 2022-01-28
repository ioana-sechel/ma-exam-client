import {ScrollView, View} from 'react-native'
import React, {useEffect, useState} from 'react'
import {Button, Text, TextArea, useToast} from "native-base";
import {connect} from "react-redux";
import Loading from "../components/Loading";
import {updateElementFieldsOnServers} from "../data/server";
import {solveServerUpdateMessage} from "../data/config";

function UpdateScreen (props) {

    const [element, setElement] = useState(undefined)
    const [nume, setNume] = useState("")
    const [medie1, setMedie1] = useState("")
    const [medie2, setMedie2] = useState("")
    const [status, setStatus] = useState("")

    const toast = useToast()

    // incarca in element, datele transmise prin props
    useEffect (() => {
        setElement(props.route.params.element)
    }, [])

    useEffect( () => {
        if(element) {
            setNume(element.nume)
            setMedie1(element.medie1)
            setMedie2(element.medie2)
            setStatus(element.status)
        }
    }, [element])


    const updateElement = async() => {
        const elementNou = {
            id:element.id,
            nume,
            medie1: Number(medie1),
            medie2: Number(medie2),
            status: Boolean(status),
        }
        console.log(elementNou)
        setElement(undefined)
        updateElementFieldsOnServers(elementNou)
            .then((res)=>{
                toast.show({
                    description: `Successfully updated fields ${solveServerUpdateMessage(res)}`,
                })

                setElement(res)
                props.navigation.goBack()
            })
            .catch((err)=>{
                console.log(err.message)
                toast.show({
                    description: err.message || err,
                })
            })
    }

    if(element)
        return (
            <ScrollView>
                <Text>Nume</Text>
                <TextArea style={{backgroundColor:'white'}} value={nume.toString()} onChangeText={(e)=>{setNume(e)}} h={10} />
{/* 
                <Text>Medie1</Text>
                <TextArea style={{backgroundColor:'white'}} value={medie1.toString()} onChangeText={(e)=>{setMedie1(e)}} h={10} />

                <Text>Medie2</Text>
                <TextArea style={{backgroundColor:'white'}} value={medie2.toString()} onChangeText={(e)=>{setMedie2(e)}} h={10} /> */}

                <Text>Status</Text>
                <TextArea style={{backgroundColor:'white'}} value={status.toString()} onChangeText={(e)=>{setStatus(e)}} h={10} />

                <Button onPress={updateElement}>Update</Button>
            </ScrollView>
        )
    return (<Loading/>)
}



export default connect()(UpdateScreen)