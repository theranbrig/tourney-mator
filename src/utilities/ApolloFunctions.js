export   const removeTournamentAlert = () => {
    Alert.alert('Remove Pool?', 'Are you sure you want to remove this pool?', [
      { text: 'NO', onPress: () => console.warn('Thanks for staying'), style: 'cancel' },
      {
        text: 'YES',
        onPress: async () => {
          await removeTournament();
          console.warn('Sorry to see you go.');
        },
      },
    ]);
  };
