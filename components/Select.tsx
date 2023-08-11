import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Modal, Image, FlatList } from 'react-native';
// import DatePicker from 'react-native-modern-datepicker';
import DatePicker from 'react-native-modern-datepicker'
import SelectDropdown from 'react-native-select-dropdown'
import dayjs from 'dayjs';


import Gallery from './Gallery';
import CalendarSvg from './CalendarSvg';
import DropdownSvg from './DropDownSvg';
import DownloadSvg from './DownloadSvg';
export interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}
export interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
  max_sol: number;
  max_date: string;
  total_photos: number;
  cameras: Camera2[];
}
export interface Camera2 {
  name: string;
  full_name: string;
}
export interface Photo {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

export default function Select() {
  const cameras = {
    'FHAZ': 'Front Hazard Avoidance Camera',
    'RHAZ': 'Rear Hazard Avoidance Camera',
    'MAST': 'Mast Camera',
    'CHEMCAM': 'Chemistry and Camera Complex',
    'MAHLI': 'Mars Hand Lens Imager',
    'MARDI': 'Mars Descent Imager',
    'NAVCAM': 'Navigation Camera'
  }
  const [gallery, setGallery] = useState<Photo[] | null>([])
  const [isOpenNoImagesModal, setIsOpenNoImagesModal] = useState(false)
  const [item, setItem] = useState<Photo | null>(null)
  const [isOpenGallery, setIsOpenGallery] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [date, setDate] = useState<string | undefined>(new Date().toString())
  const [selectedCamera, setSelectedCamera] = useState<string>(Object.values(cameras)[0])
  function handleChange(item: string, index: number) {
    setSelectedCamera(Object.keys(cameras)[index])
  }
  async function getPhotos() {
    const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${dayjs(date).format('YYYY-MM-DD')}&camera=${selectedCamera}&api_key=DEMO_KEY`)
    const data = await response.json()
    console.log(data);
    
    if(data?.photos?.length < 1) {
      setIsOpenNoImagesModal(true)
    } else {
      setGallery(data.photos)
      setIsOpenGallery(true)
    }
  }
  return (
    <View style={styles.container}>
      <Modal visible={isOpenNoImagesModal}>
        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', paddingTop: 50}}>
          <Text style={{fontSize: 20, textAlign: 'center'}}>Нет изображений, попробуйте выбрать другие параметры</Text>
          <Pressable style={{padding: 10, backgroundColor: "red", marginTop: 50}} onPress={() => setIsOpenNoImagesModal(false)}><Text>Закрыть окно</Text></Pressable>
        </View>
        </Modal>
      <Text style={styles.title}>Select Camera and Date</Text>
      <Text style={styles.textLabel}>Rover Camera</Text>
      <SelectDropdown
        buttonStyle={{ ...styles.input, flexDirection: 'row-reverse' }}
        buttonTextStyle={{ ...styles.inputText, textAlign: 'center' }}
        data={Object.values(cameras)}
        onSelect={handleChange}
        defaultValue={selectedCamera}
        renderDropdownIcon={() => <DropdownSvg />}
      />
      <Text style={styles.textLabel}>Date</Text>
      <View style={styles.input}>
        <Pressable onPress={() => setIsOpen(true)} style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.inputText}>{dayjs(date).format("DD MMM, YYYY")}</Text>
            <CalendarSvg />
          </View>
        </Pressable >
      </View>
      <Pressable style={styles.button} onPress={getPhotos}>
        <Text style={styles.buttonText}>Explore</Text>
      </Pressable>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isOpen}
      >
        <DatePicker
          mode="calendar"
          onDateChange={selectedDate => {
            setDate(selectedDate)
            setIsOpen(false)
          }}
          selected={date}
          style={{ borderRadius: 10, marginTop: 200 }}
        />
      </Modal>
      <Modal
        visible={isOpenGallery}
      >
        <View style={{ backgroundColor: '#DCCEBE', flex: 1, position: 'relative', flexDirection: 'column', paddingHorizontal: 16, paddingTop: 42, paddingBottom: 16 }}>
          <View style={{ paddingBottom: 40, flexDirection: 'row', gap: 40 }}>
            <Pressable style={{ justifyContent: 'center', alignItems: 'center', width: 40, aspectRatio: 1 }} onPress={() => {
              setIsOpenGallery(false)
            }}>
              <DropdownSvg rotation={90} stroke='#000' />
            </Pressable>
            <View>
              <Text style={{ textAlign: 'center', fontFamily: 'Dosis-SemiBold', fontSize: 18 }}>{cameras[selectedCamera]}</Text>
              <Text style={{ textAlign: 'center', fontFamily: 'Dosis-Regular' }}>{dayjs(date).format("DD MMM, YYYY")}</Text>
            </View>

          </View>
          {gallery?.length && <FlatList
            data={gallery}
            numColumns={3}
            renderItem={(({ item }) => (
              <Pressable onPress={() => {
                setItem(item)
              }}>
                <Image
                  source={{ uri: item.img_src }}
                  style={{ width: 109, aspectRatio: 1, borderRadius: 8, marginHorizontal: 8, marginVertical: 8 }}
                  />
              </Pressable>))}
            keyExtractor={(item) => item.id}
            style={{ gap: 8, flexDirection: 'row', flexWrap: 'wrap', flex: 1 }} />}
        </View>
      </Modal>
      <Modal
      visible={!!item}>
        <View style={{flex: 1, backgroundColor: '#000', paddingTop: 42}}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
            <Pressable onPress={() => {
              setItem(null)
            }} style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
              <DropdownSvg rotation={90} stroke='#fff'/>
            </Pressable>
            <View>
            <Text style={{textAlign: 'center', fontFamily: 'Dosis-Regular', color: '#fff'}}>Photo ID</Text>
            <Text style={{textAlign: 'center', fontFamily: 'Dosis-SemiBold', color: '#fff', fontSize: 18}}>{item?.id}</Text>
            </View>
            <Pressable style={{width: 40, justifyContent: 'center', alignItems: 'center'}}>
              <DownloadSvg stroke='#fff'/>
            </Pressable>
          </View>
          <Image source={{uri: item?.img_src}} style={styles.imageItem}/>
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 42,
    paddingHorizontal: 16,
  },
  title: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Dosis-SemiBold',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 22, marginBottom: 167
  },
  button: {
    backgroundColor: '#BF2E0E',
    marginTop: 24,
    paddingHorizontal: 135,
    paddingVertical: 18,
    borderRadius: 10
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Dosis-SemiBold'
  },
  input: {
    width: 'auto',
    marginTop: 7,
    marginBottom: 16,
    paddingHorizontal: 18,
    paddingVertical: 18,
    backgroundColor: '#EEE7DF',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 60,
    fontFamily: 'Dosis-Regular'
  },
  inputText: {
    fontSize: 18,
    fontFamily: 'Dosis-Regular',
    letterSpacing: 0.36
  },
  textLabel: {
    fontFamily: 'Dosis-Regular'
  },
  image: {
    width: '100%',
    position: 'absolute',
    bottom: 0
  },
  imageItem : {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 34,
    borderRadius: 8,
    marginTop: 16
  },
  gallery: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#DCCEBE',
  }
});
