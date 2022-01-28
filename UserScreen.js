import {Box, Pressable, ScrollView, Text, useToast, View} from 'native-base';
import {useEffect, useState} from "react";
import {getElementsFromServer, getFilteredData, updateElementOnServer} from "../data/server";
import {filterFunction, filterFunction1, updateSuccessMessage} from "../data/config";
import Loading from "../components/Loading";

export default function UserScreen(){
    const [elements, setElements] = useState(undefined)
    const [levels, setLevels] = useState(undefined)

    const toast = useToast()
    useEffect(()=>{
        getElementsFromServer()
            .then((res)=>{
                setElements(res)
            })
            .catch(err => {
                toast.show({description:err})
            })
    },[])

    function update(elementId){
        setElements(undefined)
        updateElementOnServer(elementId)
            .then(res=>{
                toast.show({description: updateSuccessMessage})
                getElementsFromServer()
                    .then((res)=>{
                        res = filterFunction(res)
                        setElements(res)
                    })
                    .catch(err => {
                        toast.show({description:err})
                    })

            })
            .catch(err => {
                toast.show({description: err})
            })
    }

    if(!elements) return(<Loading/>)
    return(
        <ScrollView>
            <Text>      =====================</Text>
            <Text>                  Dosare</Text>
            <Text>      =====================</Text>
            {
                filterFunction1(elements).map(element => {
                    return(
                        <Box key={element.id}>
                            <Pressable onLongPress={()=>{update(element.id)}}>
                                <Text>      ID: {element.id}</Text>
                                <Text>      Nume: {element.nume}</Text>
                                <Text>      Medie1: {element.medie1}</Text>
                                <Text>      Medie2: {element.medie2}</Text>
                                <Text>      Status: {element.status.toString()}</Text>
                                <Text>      -------------------------</Text>
                            </Pressable>
                        </Box>
                    )
                })
            }
        </ScrollView>
        )
}

