/**
 * Sample React Native App for take and upload files
 *
 * @format
 */

import React, {useState} from 'react';
import Toast from 'react-native-simple-toast';

import {
  SafeAreaView,
  StatusBar,
  Button,
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';

import {
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import cafeApi from './src/api/axiosApi';

interface FileTemp {
  uri?: string;
  type?: string;
  fileName?: string;
}

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.lighter,
    flex: 1,
  };

  //INICIO: Código de INTERES
  const [imageTemp, setImageTemp] = useState<FileTemp>();

  const getFile = (data: ImagePickerResponse) => {
    /*
    Ya que estoy suponiendo trabajar con un solo archivo,
    simplemente he usado para obtener el archivo con la función pop para extraerlo de la lista assets,
    para más información, verificar la estructura de la interfaz ImagePickerResponse
    */
    const file = data?.assets?.pop();
    if (!file) {
      return;
    }
    const resumeFile = {
      uri: file.uri,
      type: file.type,
      name: file.fileName,
    };

    return resumeFile;
  };

  //Permite acceder a la cámara o a la librería de archivos.
  const takePhoto = (from: 'camera' | 'library') => {
    const method = from === 'camera' ? launchCamera : launchImageLibrary;
    method(
      {
        mediaType: 'photo',
        quality: 0.5,
        selectionLimit: 1, //Si se requiere aceptar multiples fotos dejar este valor en 0 (default=1)
      },
      resp => {
        const {didCancel, assets} = resp;
        if (didCancel || !assets) {
          Toast.show(
            `No se ha ${
              from === 'camera' ? 'capturado ' : 'seleccionado'
            } un archivo.`,
            Toast.SHORT,
            {
              backgroundColor: 'orange',
            },
          );
          return;
        }
        setImageTemp(getFile(resp));
      },
    );
  };

  //Sube la foto seleccionada al servidor
  const uploadPhoto = async (file: FileTemp | undefined) => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('archivo', file);

    try {
      const resp = await cafeApi.post(`/uploadfile`, formData);
      console.log(resp);
      Toast.show('Se ha subido el archivo.', Toast.SHORT);
    } catch (error) {
      Toast.show('Error al subir el archivo.', Toast.SHORT, {
        backgroundColor: 'red',
      });
      console.log(error);
    }
  };
  //FIN: Código de INTERES

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={styles.titleHeader}>TEST TAKE AND UPLOAD FILES</Text>
      </View>
      {/* INICIO: Código de interés */}
      <View>
        {imageTemp?.uri && (
          <Image source={{uri: imageTemp.uri}} style={styles.image} />
        )}
        <Button title="Tomar foto" onPress={() => takePhoto('camera')} />
        <Button title="Seleccionar foto" onPress={() => takePhoto('library')} />
        <Button title="Subir archivo" onPress={() => uploadPhoto(imageTemp)} />
      </View>
      {/* FIN: Código de interés */}
    </SafeAreaView>
  );
}

export default App;

const h = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'black',
    padding: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopColor: 'red',
    borderWidth: 3,
  },
  titleHeader: {
    fontSize: 20,
    color: 'white',
  },
  image: {
    width: '100%',
    height: h - 400,
  },
});
