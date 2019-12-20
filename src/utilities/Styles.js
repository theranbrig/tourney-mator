import { StyleSheet } from 'react-native';

export const mainStyles = StyleSheet.create({
  whiteButton: {
    marginTop: 10,
    borderColor: '#fc3',
    backgroundColor: '#fff',
    borderWidth: 2,
    width: '100%',
    borderRadius: 0,
  },
  whiteButtonText: {
    fontSize: 20,
    color: '#7a0019',
    fontFamily: 'graduate',
  },
  goldButton: {
    marginTop: 10,
    borderColor: '#fff',
    backgroundColor: '#fc3',
    borderWidth: 2,
    width: '100%',
    borderRadius: 0,
  },
  goldButtonText: {
    fontSize: 20,
    color: '#7a0019',
    fontFamily: 'graduate',
  },
  form: {
    width: '100%',
    backgroundColor: '#fff',
    marginBottom: 20,
    padding: 10,
  },
  contentArea: {
    backgroundColor: '#fff',
  },
  goldTitle: {
    textAlign: 'center',
    color: '#fc0',
    fontFamily: 'graduate',
    marginBottom: 10,
    marginTop: 20,
  },
  listNoItems: {
    backgroundColor: '#7a0019',
    width: '100%',
    height: 400,
  },
  listWithItems: {
    backgroundColor: '#7a0019',
    width: '100%',
    height: 400,
    borderTopWidth: 2,
    borderTopColor: '#fff',
  },
});
