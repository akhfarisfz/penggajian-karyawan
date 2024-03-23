import { useLocation, useNavigate } from "react-router-dom";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

const PagePenggajianPrint = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (num) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(num);
  };
  const Bulan = (bulan) => {
    switch (bulan) {
      case 1:
        return "Januari";
      case 2:
        return "Februari";
      case 3:
        return "Maret";
      case 4:
        return "April";
      case 5:
        return "Mei";
      case 6:
        return "Juni";
      case 7:
        return "Juli";
      case 8:
        return "Agustus";
      case 9:
        return "September";
      case 10:
        return "Oktober";
      case 11:
        return "November";
      case 12:
        return "Desember";
      default:
        return "Bulan tidak valid";
    }
  };

  //   const onBluetoothVSCConnect = () => {
  //     var SERVICE = "000018f0-0000-1000-8000-00805f9b34fb";
  //     var WRITE = "00002af1-0000-1000-8000-00805f9b34fb";

  //     var DATA =
  //       "" +
  //       // center align
  //       "\x1B" +
  //       "\x61" +
  //       "\x31" +
  //       // double font size
  //       "\x1D" +
  //       "\x21" +
  //       "\x11" +
  //       "Uhuy\nCorporation!\n\n" +
  //       // normal font size
  //       "\x1D" +
  //       "\x21" +
  //       "\x00" +
  //       `${data.nomor}\nat ${data}` +
  //       "\x1D" +
  //       "\x21" +
  //       "\x00" +
  //       `${data}` +
  //       "\n\n\n\n\n\n\n"; // feed paper

  //     var deviceHandle;
  //     navigator.bluetooth
  //       .requestDevice({ filters: [{ services: [SERVICE] }] })
  //       .then((device) => {
  //         console.log(device);
  //         deviceHandle = device;
  //         return device.gatt.connect();
  //       })
  //       .then((server) => {
  //         console.log(server);
  //         return server.getPrimaryService(SERVICE);
  //       })
  //       .then((service) => {
  //         console.log(service);
  //         return service.getCharacteristic(WRITE);
  //       })
  //       .then((channel) => {
  //         console.log(channel);
  //         return channel.writeValue(new TextEncoder("utf-8").encode(DATA));
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       })
  //       .finally(() => {
  //         deviceHandle.gatt.disconnect();
  //       }); // center align + '\x1D' + '\x21' + '\x11' + 'Hello\nBluetooth!\n\n'                    // double font size + '\x1D' + '\x21' + '\x00' + '... from your friends\nat https://qz.io'  // normal font size + '\n\n\n\n\n\n\n';                                                     // feed paper var deviceHandle; navigator.bluetooth.requestDevice({ filters: [{ services: [SERVICE]}] }).then(device => { console.log(device); deviceHandle = device; return device.gatt.connect() }).then(server => { console.log(server); return server.getPrimaryService(SERVICE); }).then(service => { console.log(service); return service.getCharacteristic(WRITE); }).then(channel => { console.log(channel); return channel.writeValue(new TextEncoder("utf-8").encode(DATA)); }).catch(error => { console.error(error) }).finally(() => { deviceHandle.gatt.disconnect(); });
  //   };

  return (
    <>
      <Container className={"mt-4 mb-4"} fluid={true}>
        <h2 className="d-flex justify-content-center mb-4">
          <img
            src="public/B.png"
            width="40"
            height="40"
            className="d-inline-block align-top"
            alt="Logo Penggajian Absensi"
          />
          PT Teknologi Canggih Indonesia</h2>
        <h4 className="d-flex justify-content-center mb-2">Inovasi Digital Nusantara</h4>
        <h3 className="separator mb-4"
          style={{
            height: "2px",
            backgroundColor: "#000000",
          }}
        ></h3>
        <h3 className="d-flex justify-content-center">Slip Gaji Karyawan</h3>
        <h5 className="d-flex justify-content-center mb-5">
          Periode bulan: {Bulan(data.periodeGajiBulan)}
        </h5>
        <Row>
          <Col>
            <h3 className="mb-4">Profil Karyawan</h3>
            <Table borderless={true}>
              <tbody>
                <tr>
                  <th>Nama</th>
                  <td>{data.karyawanref.nama}</td>
                </tr>
                <tr>
                  <th>NIK</th>
                  <td>{data.karyawanref.nik}</td>
                </tr>
                <tr>
                  <th>Jabatan</th>
                  <td>{data.karyawanref.jabatan.nama}</td>
                </tr>
                <tr>
                  <th>Departemen</th>
                  <td>{data.karyawanref.departemen.nama}</td>
                </tr>
                <tr>
                  <th>Gaji</th>
                  <td>{formatCurrency(data.karyawanref.jabatan.gajiPokok)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className={"mb-3"}>
          <Col>
            <Table borderless={true}>
              <tbody>
                <h2>Potongan</h2>
                <tr className="mb-4">
                  <th>Pajak</th>
                  <td></td>
                </tr>
                {data.karyawanref.potongan.map((item, index) => (
                  <tr key={index}>
                    <th>
                      {item.nama} {item.potongan}%
                    </th>
                    <td>{formatCurrency(item.jumlahpotongan)}</td>
                  </tr>
                ))}
                <tr>
                  <th>Absensi</th>
                  <td>
                    {formatCurrency(
                      data.karyawanref.absensi.jumlahpotonganAbsensi
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <th>Total Potongan</th>
                  <td>{formatCurrency(data.totalPotongan)}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col>
            <Table borderless={true}>
              <tbody>
                <h2>Tunjangan</h2>
                <tr>
                  <th>Tunjangan Jabatan</th>
                  <td>{formatCurrency(data.karyawanref.jabatan.tunjangan)}</td>
                </tr>
                <tr>
                  <th>Tunjangan Departemen</th>
                  <td>0</td>
                </tr>
                <tr>
                  <th>Tunjangan Keluarga</th>
                  <td></td>
                </tr>
                <tr>
                  <th>Tunjangan Lain lain</th>
                  <td>0</td>
                </tr>
              </tbody>
            </Table>
            <Table>
              <tbody>
                <tr>
                  <th>Total Tunjangan</th>
                  <td>{formatCurrency(data.karyawanref.jabatan.tunjangan)} </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
          <Table>
            <tbody>
              <tr striped bordered hover >
                <th>Total Gaji Bersih</th>
              </tr>
              <th>
                <td className="d-flex justify-content-center gap-3">{formatCurrency(data.totalGaji)} </td>
              </th>
            </tbody>
          </Table>
        </Row>

        <Row>
          <Col className={"d-flex justify-content-center gap-3"}>
            <Button
              className={"d-print-none"}
              onClick={() => navigate("/penggajian")}
            >
              Back
            </Button>
            <Button className={"d-print-none"} onClick={handlePrint}>
              Print
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default PagePenggajianPrint;
