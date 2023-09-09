"use client"

import { Box, Flex, Text, Spacer, Button, useColorMode, useColorModeValue } from "@chakra-ui/react"
import { useState } from "react"
import { Armchair } from 'lucide-react';

type Seat = {
  name: string,
  price: number
}

export default function Home() {

  const { toggleColorMode } = useColorMode()
  const screenBackground = useColorModeValue("gray.400", "gray.700")

  // mock data
  const s1: Seat = { name: "A", price: 100 }
  const s2: Seat = { name: "B", price: 200 }
  const s3: Seat = { name: "C", price: 300 }
  const s4: Seat = { name: "D", price: 400 }

  const seats = [s1, s2, s3, s4]

  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedSeat, setSelectedSeat] = useState("None")


  function updateSeat(seat: Seat) {
    setSelectedSeat(seat.name)
    setTotalAmount(totalAmount + seat.price)
  }


  return (
    <Flex direction={"column"} m={4} gap={"4"}>
      <Flex
        direction={"column"}
        p={4} my={2} rounded={"md"}
        bg={screenBackground}
        width={"40"}
      >
        <Flex justifyContent={"space-between"} gap={2}>
          <Text>Seat: </Text>
          <Text>{selectedSeat}</Text>
        </Flex>
        <Flex justifyContent={"space-between"} gap={2}>
          <Text>Amount: </Text>
          <Text>${totalAmount}</Text>
        </Flex>
      </Flex>

      <Flex gap={"4"}>
        {seats.map(s => <SeatDisplayer key={s.name} seat={s} helper={updateSeat} />)}
      </Flex>

      <Button onClick={toggleColorMode}
        width={"max-content"}
      >
        Change Color Mode
      </Button>
    </Flex>
  )
}

type Props = {
  seat: Seat
  helper: (param: Seat) => void
}

function SeatDisplayer({ seat, helper }: Props) {



  const [buttonDisabled, SetButtonDisabled] = useState(false)
  const [seatBgLight, setSeatBgLight] = useState("green.200")
  const [seatBgDark, setSeatBgDark] = useState("green.900")

  const seatBackground = useColorModeValue(seatBgLight, seatBgDark)


  const handleButtonClick = () => {
    if (!buttonDisabled) {
      SetButtonDisabled(true)
      helper(seat)
      setSeatBgLight("red.200")
      setSeatBgDark("red.900")
    }
  }

  return (
    <Flex
      direction={"column"}
      alignItems={"center"}
      bg={seatBackground} p={2}
      rounded={"md"}
      as={"button"}
      onClick={handleButtonClick}
      disabled={buttonDisabled}
    >
      <Armchair size={66} />

      <Flex direction={"column"} >

        <Flex justifyContent={"space-between"} gap={"12"}>
          <Text>Seat: </Text>
          <Text>{seat.name}</Text>
        </Flex>

        <Flex justifyContent={"space-between"}>
          <Text>Price: </Text>
          <Text>${seat.price}</Text>
        </Flex>

      </Flex>

    </Flex>
  )
}
