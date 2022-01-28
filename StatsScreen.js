import {Box, Pressable, ScrollView, Text, useToast, View} from 'native-base';
import Loading from "../components/Loading";
import {useEffect, useState} from "react";
import {getElementsFromServer} from "../data/server";
import { filterFunction1 } from '../data/config';

export default function StatsScreen(){
    const [elements, setElements] = useState(undefined)
    const toast = useToast()
    useEffect(()=>{
        getElementsFromServer()
            .then(res => {
                setElements(res)
            })
            .catch((err) => {
                toast.show({description: err})
            })
    },[])


    if(!elements) return(<Loading/>)
    return (
        <ScrollView>
            {
                filterFunction1(elements).map(element => {
                    return(
                        <Box key={element.id}>
                            <Text>      ID: {element.id}</Text>
                            <Text>      Medie: {0.75 * element.medie1 + 0.25 * element.medie2}</Text>
                            <Text>      -------------------------</Text>
                        </Box>
                    )
                })
            }
        </ScrollView>
    )
}