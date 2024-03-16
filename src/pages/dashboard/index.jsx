import { Typography } from 'antd'
import routeGuard from '@/utils/routeGuard'
import { withSession } from '@/utils/sessionWrapper'

const { Title, Text } = Typography
const DashboardPage = () => {
	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100%',
					flexDirection: 'column'
				}}>
				<Title>NextJS Boilerplate Ant Design</Title>
				<Text>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque pulvinar nisi eget diam convallis condimentum. Donec felis lacus, placerat quis ligula eget, malesuada ornare nunc. Proin blandit nulla faucibus turpis tempus, sit amet suscipit urna tempus. Aliquam non ultrices mauris. Proin dictum justo sit amet ipsum volutpat, a eleifend dui suscipit. Nunc eu eros porttitor, dapibus mauris in, varius nisl. Sed erat eros, consequat sed tincidunt porta, eleifend eu nibh. Nullam interdum sem nec est accumsan facilisis. Fusce ac dictum elit. Pellentesque at viverra nisi, a hendrerit ligula. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur aliquam metus in augue fermentum rhoncus. Vivamus pretium semper luctus. Vivamus ac felis aliquet, porttitor elit in, venenatis arcu.

Ut ac vestibulum urna. Sed eu ultricies turpis, at fringilla neque. Etiam placerat sem ac mi porttitor porta. Nunc sollicitudin orci in nunc maximus volutpat. Morbi aliquet orci ut iaculis mollis. Quisque risus tortor, faucibus sed auctor quis, accumsan vel augue. Proin placerat hendrerit sapien, nec bibendum purus fermentum quis. Sed non tristique mi. Nam vitae magna non arcu porttitor laoreet id in lectus. Nulla facilisis tempus volutpat. Nunc ut interdum dui, vitae imperdiet purus. Vivamus lobortis est sit amet imperdiet tempus. In hendrerit sollicitudin nulla et posuere. Donec molestie dapibus nisl a volutpat.

Etiam interdum enim enim, et gravida ex hendrerit et. Donec semper ante sit amet bibendum lacinia. Maecenas sagittis nulla dui, at tincidunt nibh semper nec. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus egestas ac nulla eu aliquam. Sed ac eleifend sem. Pellentesque volutpat felis tortor, nec pellentesque sem vestibulum finibus. Nulla interdum condimentum ex, vel scelerisque erat sodales vel. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec dignissim tellus.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Fusce pretium leo ut nibh aliquam, sit amet mattis nisl pretium. Vivamus scelerisque, mauris eget dapibus ultricies, turpis nunc interdum neque, eu varius arcu sapien nec justo. Nullam sit amet mollis arcu. Integer velit erat, mollis id suscipit nec, dictum non est. Praesent in auctor odio. Etiam et lacinia ipsum. Donec eu massa enim. Donec auctor tortor a erat dignissim, nec tristique enim auctor. Sed nisl nisl, egestas eu imperdiet sed, blandit eget risus. Cras metus diam, consectetur vitae nisl non, porttitor egestas metus. Phasellus ultricies porttitor nisl a iaculis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Suspendisse potenti.

Cras bibendum efficitur faucibus. Duis et tincidunt risus. Pellentesque imperdiet feugiat mauris, ornare finibus tortor elementum vitae. Donec eu lorem id orci fringilla iaculis quis quis turpis. Donec dictum, felis non consequat accumsan, tortor sem mollis nunc, nec vehicula justo augue at dolor. Duis ultrices arcu mattis dolor dictum ultricies. Integer vel enim vel ante dictum feugiat eget a enim. Vestibulum varius dolor vel arcu ornare, non commodo lacus viverra. Proin mattis ipsum diam, id iaculis sem cursus et.

Sed sed varius massa, commodo euismod augue. Curabitur eu dictum massa, in consectetur turpis. Phasellus a nunc nisi. Maecenas sodales aliquet purus, id elementum nisl viverra rhoncus. Sed mattis lacus sem. Praesent et fringilla est. Cras a sollicitudin libero, sed consequat ligula. Cras lacinia vel massa a semper. Nulla quis nisi sem. Maecenas nec magna ac turpis laoreet cursus. Sed in mauris non arcu porttitor pretium. Vivamus finibus porttitor accumsan. Etiam in facilisis lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Vivamus a nunc vel mi aliquet suscipit at in nisl. Morbi et gravida nisl. Phasellus commodo justo nec condimentum luctus. Ut nec viverra quam. Sed ultrices risus vitae sollicitudin ultricies. Nam eleifend sodales vehicula. Morbi sollicitudin laoreet massa, ut pulvinar enim blandit sit amet.

Nam hendrerit tristique placerat. Nulla congue nisl quam, eget faucibus lorem lacinia a. Aliquam laoreet nibh vitae elit ultrices malesuada. Aenean commodo nisi quis augue lacinia, tincidunt mollis dolor faucibus. Quisque dictum venenatis ipsum ut porttitor. Sed eu lectus blandit, bibendum lacus sit amet, fermentum dolor. Quisque consectetur convallis sem, vitae dapibus nisl maximus sit amet. Phasellus ultricies felis eget auctor porta. Quisque eu metus rhoncus, scelerisque diam sit amet, vulputate justo. Nulla pellentesque accumsan augue, in porta purus sodales quis. In sit amet sagittis erat. Vestibulum est enim, efficitur et erat ac, varius viverra turpis. Nulla congue erat felis, eget pharetra purus sollicitudin vitae.

Suspendisse lacus tortor, ullamcorper non posuere quis, porttitor ac velit. Duis nisi diam, tristique ac dolor vel, eleifend iaculis massa. Nullam lacinia gravida lectus auctor porta. Curabitur ultricies erat id dolor facilisis, sed malesuada dui vestibulum. Nullam ut gravida sapien, vitae lacinia libero. Nam sollicitudin posuere libero in pharetra. Duis scelerisque ligula lacus, feugiat volutpat ipsum mollis sed. Etiam sed commodo dolor. Sed sit amet malesuada odio. Nunc id ex arcu. Vestibulum molestie neque molestie, scelerisque leo eu, tincidunt nibh. Nam eget sollicitudin dolor. Curabitur nulla ex, eleifend a nunc quis, viverra rutrum ex. Mauris eu sodales felis. Curabitur eget quam in felis pulvinar posuere vel eu purus.

Vestibulum ultrices porta justo vel ultrices. Donec accumsan enim eget tortor rutrum porta. In sollicitudin sagittis orci eget congue. Curabitur sed sagittis nunc, vel pharetra tellus. In hac habitasse platea dictumst. Donec in hendrerit diam. Praesent venenatis blandit arcu, ac semper est. Phasellus bibendum risus magna, a imperdiet eros pellentesque et.

Aenean id justo nec tortor vulputate volutpat. Curabitur dignissim velit eu lorem posuere placerat. Aenean id dolor eu lacus aliquet elementum sit amet sed eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas hendrerit erat at ullamcorper porttitor. Cras ac ultricies lectus, non interdum arcu. Mauris pellentesque enim eget varius gravida. Phasellus sed lorem sagittis purus vehicula molestie.

Vivamus efficitur, odio non egestas tincidunt, urna quam mattis leo, et ultricies est neque non purus. Praesent laoreet diam at magna dictum ornare. Cras quis massa mauris. Curabitur tempus vestibulum accumsan. Curabitur eu pretium ante. Sed laoreet tincidunt libero et ornare. Mauris scelerisque nisi in odio pulvinar suscipit. Nullam lectus purus, viverra et eros eu, sagittis elementum lectus. Sed nec quam elementum, imperdiet nisl ac, vehicula nibh. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed malesuada vestibulum metus, et vehicula arcu blandit a. Integer quis suscipit orci. Cras vitae risus vitae purus ultricies hendrerit. Etiam sed sem volutpat, ultrices urna sed, efficitur dolor. Aliquam pharetra quam eget erat convallis faucibus. Maecenas facilisis tincidunt scelerisque.

Vestibulum vitae aliquet urna. Sed non lacus ac dui fringilla elementum et dapibus ex. Suspendisse pretium hendrerit justo, et luctus ex mattis sit amet. Ut sit amet mauris vitae arcu facilisis varius at vel ex. Etiam bibendum gravida laoreet. Vestibulum vitae urna sagittis, auctor risus ut, feugiat magna. Nulla massa odio, fermentum at iaculis vitae, consequat vitae magna. Vestibulum ac quam molestie, sollicitudin nisl pulvinar, pellentesque risus.

Sed accumsan ligula quam. Maecenas sit amet odio mi. Nam maximus purus vel suscipit semper. Etiam condimentum ullamcorper rhoncus. Aliquam lacinia euismod nibh, a tincidunt leo hendrerit et. Aenean at nulla urna. Quisque aliquam neque id imperdiet varius. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.

Vestibulum quis ex sed sem tristique aliquam in eget eros. Nullam lobortis, ex at pharetra convallis, tellus orci lobortis purus, in dictum justo nunc eget sem. Sed vel elementum quam. Donec fringilla risus lacus, et dapibus nisi porta quis. Donec sollicitudin fringilla quam eget cursus. Nunc sed imperdiet mi, nec ornare leo. Quisque scelerisque viverra mi. Praesent dictum leo eu massa dapibus, non dapibus augue pretium. Fusce sed dolor ex. Etiam imperdiet, libero ut ullamcorper sagittis, enim felis suscipit lectus, eu tempus nibh mi mollis risus. Sed vehicula eu est non convallis. Cras malesuada, purus eget finibus mollis, eros dolor lobortis velit, et pulvinar felis odio et purus. Praesent ante nunc, cursus tempor ex eu, maximus vulputate elit. Aenean consequat vulputate lectus in pulvinar. Vivamus ultrices ipsum dui, eu blandit tellus laoreet ut.

Curabitur ultrices et sem non vehicula. Ut vitae est lacinia, egestas justo vitae, commodo tellus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque faucibus lacinia cursus. Morbi at nisl id dui volutpat facilisis. Fusce urna neque, suscipit eu tincidunt et, consequat sollicitudin libero. Nam luctus consequat elit vel facilisis. Maecenas metus odio, bibendum in ornare a, accumsan quis massa. Etiam in nunc sed nulla faucibus rhoncus vel ut magna. Sed at risus rhoncus, euismod lectus eu, elementum dui. Sed a neque et justo volutpat molestie. Sed eros dolor, laoreet maximus nisl at, bibendum maximus dolor. Nam interdum vestibulum sodales. Quisque sollicitudin augue non vehicula cursus. Quisque id imperdiet elit. Vestibulum sollicitudin nibh purus, eu euismod lorem aliquet vitae.

Aliquam molestie erat eget consequat consectetur. Maecenas eu convallis erat. Nam lorem augue, congue a ipsum eget, lacinia lacinia felis. Sed lacinia pellentesque viverra. In hac habitasse platea dictumst. Curabitur dapibus malesuada lorem, eu rhoncus urna. Proin pharetra metus vel rhoncus pulvinar. Aenean sit amet metus iaculis, vulputate eros vitae, ornare est. Ut vulputate ac massa sed iaculis. Quisque sagittis suscipit rhoncus. Curabitur gravida varius feugiat.

Donec bibendum, ligula vitae faucibus interdum, ante odio pulvinar sem, vel scelerisque risus mi et orci. Nunc imperdiet vulputate sem, a ornare elit pellentesque eget. Duis semper ultricies lectus, sit amet efficitur est placerat ut. Maecenas interdum vulputate elementum. Nullam aliquet mauris sapien, in efficitur orci condimentum congue. Integer purus risus, blandit sed eros eu, interdum semper erat. Nunc pulvinar, leo at efficitur scelerisque, justo magna dictum dolor, ut sagittis elit nisi ut ipsum. Pellentesque ullamcorper lectus eget aliquam cursus. Mauris at condimentum nibh, id ultrices dolor. Ut fermentum, augue sed ultricies commodo, diam turpis aliquam mauris, ut pulvinar augue felis sit amet lacus. Vestibulum dignissim augue et ante feugiat, sit amet viverra nisi sollicitudin. Ut a mauris sodales, gravida lectus vel, lacinia enim. Ut nulla ipsum, facilisis eget cursus a, tempor vel tellus.

Curabitur tempus tortor quis dolor laoreet, non vestibulum erat malesuada. Donec feugiat aliquam ante. Curabitur id aliquet velit, nec porttitor sem. Quisque sit amet nisl euismod, egestas turpis a, pulvinar ante. Aliquam rutrum, risus id aliquet auctor, mi mi varius velit, ut facilisis nibh velit non ex. Donec turpis lorem, faucibus vel justo et, sodales imperdiet diam. Cras eu ante ex. Ut justo nulla, volutpat vel risus a, sollicitudin faucibus sapien. Cras bibendum at massa a malesuada.

Morbi egestas quis nunc sit amet commodo. Fusce in vehicula mi, non tristique nisl. Sed iaculis odio sapien. Nunc non condimentum quam. Maecenas pulvinar urna eget imperdiet elementum. In non nunc a metus fermentum blandit eget rutrum tortor. Donec aliquet ipsum consequat massa viverra molestie. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Cras tristique arcu dignissim placerat vulputate. Sed nulla eros, posuere sit amet viverra sed, commodo eget eros. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Etiam mattis diam ut metus suscipit, vitae maximus libero tempus.
				</Text>
			</div>
		</>
	)
}
export default DashboardPage
export const getServerSideProps = withSession(async ({ req }) => {
	const accessToken = req.session?.auth?.access_token
	const isLoggedIn = !!accessToken
	const validator = [isLoggedIn]
	return routeGuard(validator, '/login', {
		props: {}
	})
})
