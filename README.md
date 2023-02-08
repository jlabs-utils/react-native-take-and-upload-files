# Tutorial
## Tomar fotos de galería y librería y subir archivos en React Native.

Esto es una tarea sencilla si encontramos las librerías adecuadas, en este ejemplo he usado la librería [react-native-image-picker](https://www.npmjs.com/package/react-native-image-picker) para capturar fotos con la cámara y seleccionar archivos desde la galería.

Para conectarme al servicio he usado [axios](https://www.npmjs.com/package/axios), la configuración de este archivo la he guardado en: `src/api/axiosApi.js` y se ve así:
```js
import axios from 'axios';

const baseURL = 'http://<SERVERURL>:<PORT>/<URI>'; //Debería reemplazarse por la url donde se encuentra el servicio base

const cafeApi = axios.create({baseURL});

cafeApi.interceptors.request.use(async config => {
  const token = ''; //Esto debería reemplazarse por el metódo, utilería o demás donde se pueda obtener el token
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
});

export default axiosApi;

```

Aquí se debe actualizar la baseURL con la url que estés usando, si tu URL no tiene puerto puedes omitirlo junto a los dos puntos que le preceden.

### Ejemplos:
```js
//Sin puerto
const baseURL = 'http://starlly.com/api';

//Con puerto
const baseURL = 'http://localhost:8000/api'; 
```


# Implementación en React

He creado un proyecto nuevo con el comando `npx react-native init AwesomeProject`, pero en este caso no tendrías que hacerlo, solo tienes que descargar este repositorio ya sea como un ZIP o clonando el repositorio con [git](https://git-scm.com/) con el comando `git clone https://github.com/jlabs-utils/react-native-take-and-upload-files.git`.

Una vez descargado, ejecutar el siguiente comando:
```bash
npm install
```
Si tienes instalado yarn te recomiendo usarlo en vez de usar npm y ejecutar el siguiente comando:
```bash
yarn
```
Así una vez instalado podrás ejecutar el proyecto.

```bash
# Si usas npm:
npm run android # Si quieres ejecutar el proyecto en android
npm run ios # Si quieres ejecutar el proyecto en ios

# Si usas yarn:
yarn android
yarn ios
```

De esta forma, deberías ver algo como esto, donde podrás tomar fotos o seleccionarlas de tu galería y subirlas al servidor que hayas configurado en el archivo `src/api/axiosApi.js:`
<br/>
<img src="https://user-images.githubusercontent.com/8765273/217450332-371f1d7f-0e0d-4265-a7a1-15574fef8b3f.jpeg" width="300"/>
