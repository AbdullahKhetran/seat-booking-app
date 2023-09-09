"use client"

import { Box, Flex, Text, Spacer, Button, useColorMode, useColorModeValue, Center } from "@chakra-ui/react"
import { useState } from "react"
import { Armchair } from 'lucide-react';

type Seat = {
  id: string
  name: string,
  price: number
}

export default function Home() {

  const { toggleColorMode } = useColorMode()
  const screenBackground = useColorModeValue("gray.300", "gray.700")

  // mock data
  const s1: Seat = { id: "a", name: "A", price: 100 }
  const s2: Seat = { id: "b", name: "B", price: 200 }
  const s3: Seat = { id: "c", name: "C", price: 300 }
  const s4: Seat = { id: "d", name: "D", price: 400 }

  const seats = [s1, s2, s3, s4]

  const [totalAmount, setTotalAmount] = useState(0)

  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([])

  // updates screen ui by changing state
  function selectSeat(seat: Seat) {
    setSelectedSeats( // dont mutate array
      [
        ...selectedSeats,
        seat
      ]
    )
    setTotalAmount(totalAmount + seat.price)
  }

  function deSelectSeat(seat: Seat) {
    setSelectedSeats( // dont mutate array
      selectedSeats.filter(s => s.id !== seat.id)
    )
    setTotalAmount(totalAmount - seat.price)
  }

  return (
    <Flex direction={"column"} m={4} gap={"4"}>

      {/* Seats */}
      <Text fontSize={"larger"} fontWeight={"bold"}>
        Choose your seats
      </Text>
      <Flex gap={"4"} wrap={"wrap"}>
        {seats.map(s =>
          <SeatDisplayer
            key={s.name}
            seat={s}
            select={selectSeat}
            deselect={deSelectSeat}
          />)}
      </Flex>

      {/* Screen */}
      {selectedSeats.length === 0 ? null :
        <Flex
          direction={"column"}
          p={4} my={2}
          rounded={"md"}
          bg={screenBackground}
          width={"60"}
        >
          <Center
            fontSize={"large"}
            fontWeight={"bold"}
            mb={2}
          >
            Your Bill Summary
          </Center>
          {/* Price Summary */}
          <Box border={"1px"} p={2} rounded={"lg"}>

            <Flex
              justifyContent={"space-between"}
              gap={2}
              fontWeight={"semibold"}
            >
              <Text>Seat</Text>
              <Text>Price</Text>
            </Flex>

            {selectedSeats.map(s =>
              <Flex key={s.name} justifyContent={"space-between"}>
                <Text>{s.name}</Text>
                <Text>${s.price}</Text>
              </Flex>)}
          </Box>
          {/* Total Amount */}
          <Flex
            justifyContent={"space-between"}
            gap={2}
            mt={2}
            fontWeight={"semibold"}
          >
            <Text>Total </Text>
            <Text>${totalAmount}</Text>
          </Flex>

        </Flex>
      }

      {/* Button for dark mode */}
      <Button onClick={toggleColorMode}
        width={"max-content"}
      >
        Change Color Mode
      </Button>
    </Flex>
  )
}

// Props for seat displayer component
type Props = {
  seat: Seat
  select: (param: Seat) => void
  deselect: (param: Seat) => void
}

function SeatDisplayer({ seat, select, deselect }: Props) {
  const [selected, SetSelected] = useState(false) // to disable button
  const [seatBgLight, setSeatBgLight] = useState("green.200") // seat colors in light mode
  const [seatBgDark, setSeatBgDark] = useState("green.900") // seat colors in dark mode

  const seatBackground = useColorModeValue(seatBgLight, seatBgDark)

  // disable button and updates ui
  const handleButtonClick = () => {
    if (!selected) { // select it and change color
      SetSelected(true)
      select(seat)
      setSeatBgLight("red.200")
      setSeatBgDark("red.900")
    } else if (selected) { // deselect it and change color
      SetSelected(false)
      deselect(seat)
      setSeatBgLight("green.200")
      setSeatBgDark("green.900")
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
