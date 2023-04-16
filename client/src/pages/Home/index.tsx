import {Button, Table} from '@nextui-org/react';
import ScrollToTop from "../../components/ScrollToTop";

export default function HomePage(props: any) {
  const {content, setContent, accessToken, setContentUri} = props

  const handleItemClick = async (item: any) => {
    setContent(item);
    if (!(accessToken && accessToken.length > 0)) {
      setContentUri('');
      alert(
        'Looks like either you are disconnected or connected with a wallet that does not contain a Fanstop NFT!'
      );
    }
  };

  return (
    <div>
      <ScrollToTop />
      <Table
        aria-label="Example table with static content"
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>NAME</Table.Column>
          <Table.Column>STATUS</Table.Column>
        </Table.Header>
        <Table.Body>
          {content.map((item: any, idx: number) => (
            <Table.Row key={idx}>
              <Table.Cell>{String(item.name).split(
                'encrypted_'
              )[1]}</Table.Cell>
              <Table.Cell>
                <Button onPress={() => handleItemClick(item.name)}> View</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
