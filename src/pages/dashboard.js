import Head from "next/head"
import Sidebar from "@/componenets/Sidebar"
import {supabase} from "@/managers/supabase"
import {useRouter} from "next/router"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import {scanTypes} from "@/utils/dummyData";
import {calculateAge} from "@/utils/calcAge";

const COLORS = ['#0088FE', '#FF8042']

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function countObjectsByMonth(arr) {
  return arr.reduce((acc, obj) => {
    const month = new Date(obj["date"]).getMonth();
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, []);
}

function countScanTypes(values, objects) {
  const result = [];
  values.forEach((value) => {
    const count = objects.filter((obj) => obj["type"] === value).length;
    result.push({ name: value, pv: count });
  });
  return result;
}



export const getServerSideProps = async ({ query }) => {

  let scansData;

  const { data, error } = await supabase
    .from("scans")
    .select("*, doctors ( name ), subjects ( * )")
  scansData = data

  return {
    props: {
      scansData: scansData ?? []
    }
  }
}

export default function Scanlist({ scansData }) {

  const router = useRouter()

  const chartData1 = [
    { name: 'Male', value: scansData.filter(scan => scan["subjects"]["sex"] === "Male").length },
    { name: 'Female', value: scansData.filter(scan => scan["subjects"]["sex"] === "Female").length },
  ];

  // I should have used reduce here but anywaysss
  const chartData2 = [
    { name: "10:20", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 10 && calculateAge(scan["subjects"]["birth_date"]) < 20).length},
    { name: "20:30", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 20 && calculateAge(scan["subjects"]["birth_date"]) < 30).length},
    { name: "30:40", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 30 && calculateAge(scan["subjects"]["birth_date"]) < 40).length},
    { name: "40:50", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 40 && calculateAge(scan["subjects"]["birth_date"]) < 50).length},
    { name: "50:60", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 50 && calculateAge(scan["subjects"]["birth_date"]) < 60).length},
    { name: "60:70", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 60 && calculateAge(scan["subjects"]["birth_date"]) < 70).length},
    { name: "70:80", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 70 && calculateAge(scan["subjects"]["birth_date"]) < 80).length},
    { name: "+80", pv: scansData.filter(scan => calculateAge(scan["subjects"]["birth_date"]) >= 80).length},
  ]

  const scanTypeNames = scanTypes.map(scanType => scanType.name)
  const chartData4 = countScanTypes(scanTypeNames, scansData)

  const chartData3 = []
  const months = ["Jan", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const countsArray = countObjectsByMonth(scansData)
  for (let i = 0; i < months.length; i++) {
    chartData3.push({ name: months[i], pv: countsArray[i] ?? 0 })
  }

  return (
    <>
      <Head>
        <title>ResonanceM | Scans List</title>
      </Head>
      <div className="flex">
        <Sidebar currentLinkId={0} />
        <section className="ml-72 mr-8 container mx-auto my-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-x-3">
                <h2 className="text-lg font-medium text-gray-800 dark:text-white">Dashboard</h2>

                  {/*<span*/}
                  {/*  className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">{`${scansData.length} Scans`}</span>*/}
                </div>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Get an overview of everything happening in your lab.</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 py-8">
              <div className="col-span-2 px-8 pt-8 pb-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
                  Male vs Female Subjects
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  See and compare how many male and female subjects have been scanned by your lab
                </p>
                <div className="mx-auto w-full h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={800} height={800}>
                      <Pie
                        data={chartData1}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData1.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend verticalAlign="bottom" wrapperStyle={{ lineHeight: '10px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-span-4 px-8 pt-8 pb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
                  Subjects' Age Distribution
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Figure out how many scans were made for each age category.
                </p>
                <div className="mx-auto w-full h-80 p-2 pt-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={300}
                      height={300}
                      data={chartData2}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                      barSize={40}
                    >
                      <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 10 }} />
                      <YAxis />
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar dataKey="pv" fill="#0088FE" background={{ fill: '#eee' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-span-3 px-8 pt-8 pb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
                  Scan Types Distribution
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Figure out how many scans were made for each scan type.
                </p>
                <div className="mx-auto w-full h-80 p-2 pt-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      width={300}
                      height={300}
                      data={chartData4}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                      barSize={40}
                    >
                      <XAxis dataKey="name" scale="point" padding={{ left: 30, right: 10 }} />
                      <YAxis />
                      <Tooltip />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Bar dataKey="pv" fill="#FF8042" background={{ fill: '#eee' }} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="col-span-3 px-8 pt-8 pb-2 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <h3 className="font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
                  Number of Scans Over The Year
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Plotting the number of scans made in each month of the current year
                </p>
                <div className="mx-auto w-full h-80 pt-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      width={500}
                      height={300}
                      data={chartData3}
                      margin={{
                        top: 5,
                        right: 0,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="pv" stroke="#0088FE" strokeWidth={2} activeDot={{ r: 7 }} />
                      {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>


              {/*after charts*/}
            </div>
        </section>
      </div>
    </>
  );
}


