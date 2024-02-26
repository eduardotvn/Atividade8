import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, ScrollView, TextInput } from 'react-native-web';
import axios from 'axios';

axios.defaults.baseURL = 'http://10.0.84.179:1337/api';

export default function App() {

    const [dados, setDados] = React.useState([]);
    const [usuario, setUsuario] = React.useState('');
    const [senha, setSenha] = React.useState('');
    const [jwt, setJwt] = React.useState('');

    return (
        <View style={styles.container}>
            <Button title="Conexão" onPress={async () => {
                const { data } = await axios.get('/informes', { headers: { Authorization: `Bearer ${jwt}` } });
                setDados(data.data);
            }
            }
            />
            <View style={styles.textInput}>
                <Text variant="headlineMedium">Email</Text>
                <TextInput
                    label="Email"
                    value={email}
                    onChangeText={email => setUsuario(email)}
                />
            </View>
            <View style={styles.textInput}>
                <Text variant="headlineMedium">Senha</Text>
                <TextInput
                    label="Senha"
                    secureTextEntry={true}
                    value={senha}
                    onChangeText={senha => setSenha(senha)}
                />
            </View>
            <Button title="Login" onPress={async () => {
                try {
                    const response = await axios.post('/auth/local', { identifier: usuario, password: senha });
                    setJwt(response.data.jwt);
                }
                catch (error) {
                    console.log(error);
                }

            }
            }
            />

            <ScrollView>
                {dados.map((item) => (
                    <Text key={item.id}>{item.attributes.autor}</Text>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInput: {
        paddingTop: '10%',
    }
});
