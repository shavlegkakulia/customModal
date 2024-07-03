1) App.tsx ჩავრაპე პროვაიდერში.
<ModalProvider>
  <Navigation />
<ModalProvider>

2) Navigation.tsx ში ბოლო ჩაილდად შექმენი მოდალის რენდერერი.
  const { modals } = useModal();
<NavigationContainer>
{/*other children */}
        {modals.map((modal) => (
        <CustomModal key={modal.id} id={modal.id} isVisible={modal.isVisible}>
          {modal.content}
        </CustomModal>
      ))}
</NavigationContainer>

3) გამოყენება. მაგალითად ლოგინის სქრინზე:

      const { addModal } = useModal();


    const openModal = () => {
        const id = Math.random().toString();
        addModal({ id, content: <Text>Modal Content</Text>, isVisible: true });
    };

   return <View>
    <Button  title="Open modal" onPress={openModal}/>
   </View>
