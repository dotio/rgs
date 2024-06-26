import React from 'react'
import styled from 'styled-components'
import {TitleText} from '../../../ui/title-text'
import {MediumText} from '../../../ui/medium-text'
import {Wrapper} from '../../../ui/wrapper'
import {getColor} from '../../../ui/helpers/getColor'
import {Link} from '../../../routes'

const PrimaryLink = styled.a`
  color: ${(p) => getColor('primary', p.theme)};
  text-decoration: none;
  cursor: pointer;
`

export const OfferText = () => (
  <Wrapper flow={'column'} gap={'48px'}>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>ПУБЛИЧНАЯ ОФЕРТА О ЗАКЛЮЧЕНИИ ДОГОВОРА ОБ ОКАЗАНИИ УСЛУГ АССИСТАНСА</TitleText>
      <TitleText>Порядок заключения Договора, стороны Договора</TitleText>
      <MediumText>
        Ассистанская организация (далее – Исполнитель), указанная в Приложении № 1 к договору об оказании услуг
        ассистанса, заключаемого на основании настоящей оферты (далее – Оферта), и выбранная Заказчиком по своему
        усмотрению, в соответствии со ст. ст. 435, 437, 438 Гражданского кодекса Российской Федерации предлагает любому
        правоспособному и дееспособному физическому лицу (далее –  Заказчик) заключить договор об оказании услуг
        ассистанса (далее – Договор) на условиях, приведенных ниже.
      </MediumText>
      <MediumText>
        Оферта определяет все существенные условия Договора между Исполнителем и Заказчиком, в том числе, порядок
        оказания услуг Исполнителя.
      </MediumText>
      <MediumText>
        Оферта, а также вся информация об услугах Исполнителя: стоимость, виды и сроки оказания услуг опубликованы на
        Сайте <Link route={'/'} passHref><PrimaryLink target={'_blank'}> https://med.moi-service.ru </PrimaryLink></Link> и в Мобильном приложении «Мой_Сервис.Мед».
      </MediumText>
      <MediumText>
        Надлежащим безоговорочным акцептом Оферты является предварительная оплата Заказчиком услуг Исполнителя
        в 100 % (сто) размере.
      </MediumText>
      <MediumText>
        Договор заключается в каждом случае обращения Заказчика за услугой Исполнителя или за программой (комплексом)
        услуг, если таковая предусмотрена Прайс-листом Исполнителя (как он определен ниже).
      </MediumText>
      <TitleText>ДОГОВОР ОБ ОКАЗАНИИ УСЛУГ АССИСТАНСА</TitleText>
      <MediumText>
        Настоящий Договор заключен между Исполнителем и Заказчиком, совершившим акцепт Оферты.
      </MediumText>
      <TitleText>1. Термины и определения</TitleText>
      <Wrapper flow={'column'} gap={'24px'}>
        <MediumText>
          В целях Договора нижеприведенные термины используются в следующих значениях:
        </MediumText>
        <MediumText>
          <strong>Стороны Договора (Стороны)</strong> – Заказчик и Исполнитель.
        </MediumText>
        <MediumText>
          <strong>Заказчик</strong> – совершеннолетнее дееспособное физическое лицо, заключившее Договор с Исполнителем путем акцепта
          Оферты и, тем самым, получившее право получать ассистанские услуги Исполнителя, и в полном объеме выполняющее
          свои обязательства по настоящему Договору.
        </MediumText>
        <MediumText>
          <strong>Исполнитель</strong> – ассистанская организация, указанная в Приложении № 1 к Договору.
        </MediumText>
        <MediumText>
          <strong>Услуга (услуга ассистанса)</strong> – информационно-консультационная услуга и/или услуга по
          организации предоставления медицинской помощи, по подбору медицинской организации, врача-специалиста по
          запросу Заказчика, в том числе с использованием Сайта https://med.moi-service.ru или в мобильном приложении
          «Мой_Сервис.Мед», выполняемая в том числе работником Исполнителя, имеющим медицинское образование.
        </MediumText>
        <MediumText>
          <i>Услуга ассистанса не является медицинской помощью, медицинской услугой. Медицинские услуги оказываются
            медицинскими организациями, осуществляющими свою деятельность на основании медицинской лицензии, выданной
            в порядке, установленном действующем законодательством Российской Федерации.</i>
        </MediumText>
        <MediumText>
          <strong>Личный кабинет</strong> – информационный ресурс, который размещен на Сайте https://med.moi-service.ru
          или в Мобильном приложении «Мой_Сервис.Мед», предоставляющий Заказчику возможность заказывать Услуги и
          осуществлять доступ к информации о заказанных у Исполнителя Услугах. Доступ к Личному кабинету осуществляется
          с использованием кодов и (или) паролей.
        </MediumText>
        <MediumText>
          <strong>Мобильное приложение</strong> – приложение «Мой_Сервис.Мед» для операционных систем iOS и Android,
          предназначенное для оказания Услуг. Мобильное приложение является объектом интеллектуальной собственности. Исключительными правами на Мобильное приложение обладает Общество с ограниченной ответственностью «ЛегионКом». Использование Мобильного приложения осуществляется с использованием кодов и(или) паролей.
        </MediumText>
        <MediumText>
          <strong>Персональные данные</strong> – любая информация, относящаяся прямо или косвенно к определенному или
          определяемому физическому лицу (субъекту персональных данных).
        </MediumText>
        <MediumText>
          <strong>Прайс-лист</strong> – действующий перечень Услуг Исполнителя с ценами на них, публикуемый на Сайте
          https://med.moi-service.ru и в Мобильном приложении «Мой_Сервис.Мед».
        </MediumText>
        <MediumText>
          <strong>Сайт Исполнителя</strong> – интернет-сайт Исполнителя, размещенный по адресу, указанному в
          Приложении № 1 к настоящему Договору. Сайты Исполнителей являются объектами интеллектуальной собственности.
          Исключительными или неисключительными правами на Сайты Исполнителей обладают Исполнители.
        </MediumText>
        <MediumText>
          <strong>Сайт</strong> - интернет-сайт, размещенный по адресу https://med.moi-service.ru. Сайт
          https://med.moi-service.ru является объектом интеллектуальной собственности Общества с ограниченной
          ответственностью «ЛегионКом».
        </MediumText>
        <MediumText>
          <strong>Специалист</strong> – работник Исполнителя, непосредственно оказывающий Услугу и имеющий законченное
          медицинское образование.
        </MediumText>
        <MediumText>
          <strong>Программа Исполнителя</strong> – комплекс Услуг, размещенный на Сайте и в Мобильном приложении.
        </MediumText>
        <MediumText>
          <strong>Телефон горячей линии «____»</strong> - телефонный номер Исполнителя, служащий для круглосуточной
          коммуникации с Заказчиком по вопросам предоставления Услуг.
        </MediumText>
      </Wrapper>
    </Wrapper>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>2. Предмет Договора.</TitleText>
      <Wrapper flow={'column'} gap={'24px'}>
        <MediumText>
          2.1. Исполнитель обязуется в течение срока действия Договора на основании запросов Заказчика
          оказывать ему Услуги по ценам согласно Прайс-листу, размещенному на Сайте  и в Мобильном приложении,
          с учетом графика работы Специалистов, а Заказчик обязуется оплатить Услуги.
        </MediumText>
        <MediumText>
          2.2. Конкретный перечень и дата оказания Услуг согласовываются сторонами путем направления Заказчиком
          соответствующего запроса через Личный кабинет на Сайте или в Мобильном приложении или по Телефону
          горячей линии.
        </MediumText>
        <MediumText>
          2.3. Договор вступает в силу с даты акцепта.
        </MediumText>
        <MediumText>
          2.4. Постоянный адрес Договора в сети «Интернет»: https://med.moi-service.ru/about/documents/offer.
        </MediumText>
      </Wrapper>
    </Wrapper>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>3. Права и обязанности Сторон</TitleText>
      <Wrapper flow={'column'} gap={'24px'}>
        <MediumText>
          3.1. Исполнитель обязан:
        </MediumText>
        <MediumText>
          3.1.1. Предоставить Заказчику доступную, достоверную информацию о порядке и условиях предоставления Услуг.
        </MediumText>
        <MediumText>
          3.1.2. Своевременно и качественно оказывать Услуги в соответствии с условиями Договора. Услуги считаются
          оказанными надлежащим образом и принятыми Заказчиком, если в течение 7 (семи) календарных дней с момента их
          оказания Заказчик не предъявит претензии к качеству Услуг.
        </MediumText>
        <MediumText>
          3.1.3. Информировать Заказчика об обстоятельствах, объективно препятствующих возможности оказания Услуг.
        </MediumText>
        <MediumText>
          3.1.4. Не предоставлять третьим лицам находящиеся у Исполнителя данные о Заказчике, в том числе Персональные
          данные Заказчика , за исключением случаев, когда это необходимо для соблюдения требований законодательства
          Российской Федерации, исполнения обязательств по настоящему Договору или иному договору, выгодоприобретателем
          по которому является Заказчик, а также в случаях, когда предоставление данных осуществляется в статистических
          или иных исследовательских целях, при условии обязательного обезличивания данных перед их предоставлением
          третьему лицу.
        </MediumText>
        <MediumText>
          Данные, в объеме, необходимом для достижения указанных целей, могут предоставляться: по согласованию с
          Заказчиком привлекаемому медицинскому работнику сторонней медицинской организации , страховой организации,
          предоставляющей Заказчику услуги добровольного медицинского страхования, организациям, предоставляющим
          Исполнителю услуги информирования Заказчика о предстоящем приеме или исследовании, проведения статистических
          и иных исследований и иным третьим лицам, при условии соблюдения ими конфиденциальности полученных данных.
          Исполнитель обязуется организовать и оказать выбранную Заказчиком Услугу качественно и с учетом описания
          Услуги, которая выбрана Заказчиком.
        </MediumText>
        <MediumText>
          3.1.5. Самостоятельно избирать форму оказания Услуг с учетом условий оказания Услуг, выбранных Заказчиком.
        </MediumText>
        <MediumText>
          3.1.6. Обеспечить круглосуточную работу Телефона горячей линии для Заказчиков.
        </MediumText>
        <MediumText>
          3.2. Исполнитель имеет право:
        </MediumText>
        <MediumText>
          3.2.1. Получать от Заказчика любую информацию, необходимую для выполнения своих обязательств по Договору.
        </MediumText>
        <MediumText>
          3.2.2. Приостановить оказание Услуг, если Заказчиком не предоставлена информация, необходимая для оказания
          Услуг, или предоставлена неполная или недостоверная информация, до момента предоставления необходимой информации.
        </MediumText>
        <MediumText>
          3.2.3. Отказать в оказании Услуг в случае неоплаты или неполной оплаты Услуг.
        </MediumText>
        <MediumText>
          3.2.4. В любое время полностью или частично изменять описание Услуг, с учетом предварительного уведомления
          Заказчика; такие изменения и дополнения вступают в силу немедленно после соответствующего уведомления, которое
          может быть направлено Заказчику в любой форме, включая, но, не ограничиваясь, размещением соответствующего
          уведомления на Сайте Исполнителя и (или) либо иным образом.
        </MediumText>
        <MediumText>
          3.3. Заказчик обязан:
        </MediumText>
        <MediumText>
          3.3.1. Оплачивать услуги Исполнителя в порядке, сроки и на условиях, которые установлены Договором. Заказчик
          освобождается от обязанности по оплате Услуг, в той части, в которой оплата Услуг в пользу Заказчика
          осуществляется третьими лицами.
        </MediumText>
        <MediumText>
          3.3.2. Сообщать Исполнителю сведения (в том числе, Персональные данные), необходимые Исполнителю для
          предоставления Заказчику Услуг и исполнения других своих обязательств, установленных Договором и действующим
          законодательством Российской Федерации;
        </MediumText>
        <MediumText>
          3.3.3. Самостоятельно следить за обновлениями информации, размещаемой на Сайте и в Мобильном приложении, в
          том числе, следить за изменениями условий оказания Услуг, изменениями настоящего Договора, которые прямо или
          косвенно связаны с оказанием Услуги или влияют на них.
        </MediumText>
        <MediumText>
          3.3.4. Обеспечить для получения Услуг наличие следующего оборудования: персональный компьютер или  мобильный
          телефон, которые должны соответствовать нижеуказанным техническим требованиям. Для получения Услуг необходимо
          убедиться в том, что устройство, через которое будет осуществляться доступ к Сайту, соответствует следующим
          требованиям.
        </MediumText>
        <MediumText>
          Персональный компьютер:
        </MediumText>
        <MediumText>
          <ul>
            <li>подключенная к компьютеру видеокамера обладает разрешением не ниже 1024 х 720 (для оказания услуг с использованием видеосвязи);</li>
            <li>к компьютеру подключен микрофон (для оказания услуг с использованием видео- или аудио- связи);</li>
            <li>операционная система MS Windows версией не ниже 7 или Mac OS X;</li>
            <li>интернет-обозреватель (браузер):</li>
            <li>для ОС MS Windows: Chrome (не ниже версии 71), Firefox (не ниже версии 62), Opera (не ниже версии 58);</li>
            <li>для Mac OS X: Chrome (не ниже версии 71), Firefox (не ниже версии 62), Safari (не ниже версии 12);</li>
            <li>скорость канала доступа в Интернет не ниже 1 Мбит/с.</li>
          </ul>
        </MediumText>
        <MediumText>
          Мобильный телефон:
        </MediumText>
        <MediumText>
          <ul>
            <li>модель мобильного телефона Apple Iphone 6 (с системой не ниже IOS 11) и выше с работающей камерой, микрофоном;</li>
            <li>браузеры: Safari (не ниже версии 11), Chrome (не ниже версии 71)</li>
            <li>мобильный телефон, работающий на системе Android 5.0 и выше;</li>
            <li>браузеры: Android Browser (не ниже версии 5.0) Chromium (не ниже версии 81) Android Chrome (не ниже версии 71);</li>
            <li>любой мобильный телефон, если Заказчик будет обращаться для оказания услуг посредством аудиосвязи.</li>
          </ul>
        </MediumText>
        <MediumText>
          3.4. Заказчик имеет право:
        </MediumText>
        <MediumText>
          3.4.1. Получать от Исполнителя информацию об объеме и содержании Услуг.
        </MediumText>
        <MediumText>
          3.4.2. Отказаться от исполнения Договора в порядке, установленном действующим законодательством Российской Федерации.
        </MediumText>
        <MediumText>
          3.4.3. Сообщать свои контактные данные для получения информации об оказанных Услугах в электронном виде.
          Стороны признают достоверным и достаточным для целей получения Заказчиком информации в Личном кабинете на
          Сайте или в Мобильном приложении номер мобильного телефона, указанный им при регистрации на этих ресурсах, а
          также при первом обращении к Исполнителю по телефону.
        </MediumText>
      </Wrapper>
    </Wrapper>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>4. Стоимость услуг и порядок расчетов</TitleText>
      <Wrapper flow={'column'} gap={'24px'}>
        <MediumText>
          4.1. Стоимость Услуг определяется согласно Прайс-листу Исполнителя, опубликованному на Сайте и в Мобильном приложении, и действующему на момент обращения Заказчика.
        </MediumText>
        <MediumText>
          4.2. Услуги предоставляются Заказчику на условиях полной предварительной оплаты.
        </MediumText>
        <MediumText>
          4.3. Оплата услуг Исполнителя осуществляться в безналичном порядке, в том числе, с использованием банковских
          платежных карт, если оплата не производится иными лицами (в том числе по договору добровольного медицинского
          страхования).
        </MediumText>
        <MediumText>
          4.4. Цены, устанавливаемые Исполнителем, могут быть изменены последним в любое время. Новые цены вступают в
          силу с момента опубликования обновленного Прайс-листа на Сайте и в Мобильном приложении, если иной срок
          вступления новых цен в силу не определен дополнительно при их опубликовании.
        </MediumText>
        <MediumText>
          4.5. Оплата Услуг осуществляется при помощи организаций, оказывающих услуги по приему и перечислению платежей
          в безналичной форме, с предоставлением документов, подтверждающих факт осуществления платежа в соответствии с
          требованиями действующего законодательства Российской Федерации.
        </MediumText>
        <MediumText>
          4.6. Денежные средства в счет оплаты стоимости медицинских и иных услуг, организация и предоставление  которых
          осуществляется в результате оказания услуг Исполнителя, перечисляются Заказчиком на счет Исполнителя (его
          уполномоченного представителя) одновременно с оплатой стоимости услуг Исполнителя. Исполнитель перечисляет
          указанную стоимость медицинских и иных услуг непосредственно лицу, оказывающему эти услуги, в соответствии с
          порядком взаиморасчетов, предусмотренным в договоре между Исполнителем и лицом, оказывающем эти услуги.
        </MediumText>
        <MediumText>
          4.7. Возврат стоимости неоказанных Услуг ассистанса или иных услуг сторонних организаций, в том числе
          медицинских, осуществляется в течение 7 (семи) рабочих дней с даты направления Заказчиком письменного
          обращения о возврате денежных средств за неоказанные Услуги/иные услуги на Сайте или в Мобильном приложении.
        </MediumText>
      </Wrapper>
    </Wrapper>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>5. Ответственность сторон</TitleText>
      <Wrapper flow={'column'} gap={'24px'}>
        <MediumText>
          5.1. Никакие претензии Заказчика относительно сроков оказания Услуг не принимаются, если Заказчик не направит
          запрос на оказание Услуг и/или не будет находиться в зоне доступа в назначенное для окзание Услуг время по
          указанным Заказчиком средствам связи (телефон, Интернет).
        </MediumText>
        <MediumText>
          5.2. Стороны Договора освобождаются от ответственности за неисполнение или ненадлежащее исполнение условий
          Договора, если они докажут, что неисполнение или ненадлежащее исполнение произошло вследствие непреодолимой
          силы, а также по иным основаниям, предусмотренным действующим законодательством.
        </MediumText>
        <MediumText>
          5.3. Исполнитель освобождается от ответственности за наступление негативных последствий, возникших в
          результате несообщения Заказчиком необходимой для оказания Услуги информации.
        </MediumText>
        <MediumText>
          5.4. При несоблюдении Исполнителем условий Договора Заказчик вправе расторгнуть его в одностороннем порядке и
          требовать от Исполнителя возврата стоимости оплаченных, но не оказанных Услуг.
        </MediumText>
        <MediumText>
          5.5. В остальных случаях Заказчик и Исполнитель несут ответственность в соответствии с действующим
          законодательством Российской Федерации.
        </MediumText>
      </Wrapper>
    </Wrapper>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>6. Соглашение между участниками электронного взаимодействия</TitleText>
      <Wrapper flow={'column'} gap={'24px'}>
        <MediumText>
          6.1. Настоящий раздел применим ко всем видам оказываемых Исполнителем Услуг.
        </MediumText>
        <MediumText>
          6.2. Взаимодействие с Заказчиком при оказании  Услуг осуществляется с соблюдением требований законодательства
          Российской Федерации.
        </MediumText>
        <MediumText>
          6.3. Под электронным документом понимается сообщение, в том числе заказ Услуг, сформированное и направленное
          Заказчиком с использованием Личного кабинета
        </MediumText>
        <MediumText>
          6.4. Заказчик может осуществлять взаимодействие со Специалистом Исполнителя с использованием Сайта и
          Мобильного Приложения посредством передачи электронного документа, сформированного в Личном кабинете, который
          подписывается простой электронной подписью Заказчика. Стороны признают электронные документы, подписанные
          простой электронной подписью, равнозначными документам на бумажных носителях, подписанным собственноручной
          подписью.
        </MediumText>
        <MediumText>
          6.5. Стороны предусмотрели следующие правила определения Заказчика, подписывающего электронный документ, по ее
          простой электронной подписи:<br/>
          электронный документ считается подписанным простой электронной подписью Заказчика, если он направлен
          Заказчиком Исполнителю с использованием Личного кабинета на Сайте или в Мобильном приложении.
        </MediumText>
        <MediumText>
          6.6. Заказчик обязуется осуществлять доступ к Личному кабинету на Сайте или в Мобильном приложении
          исключительно посредством авторизации с использованием кодов и (или) паролей. При этом Заказчик обязуется
          соблюдать конфиденциальность указанных кодов и(или) паролей и не передавать такие коды и (или) пароли третьим
          лицам.
        </MediumText>
      </Wrapper>
    </Wrapper>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>7. Заключительные положения</TitleText>
      <Wrapper flow={'column'} gap={'24px'}>
        <MediumText>
          7.1. Споры, вытекающие из настоящего Договора, разрешаются в претензионном порядке.
        </MediumText>
        <MediumText>
          7.2. Все вопросы, не урегулированные настоящим Договором, разрешаются в соответствии с действующим
          законодательством Российской Федерации. Претензия должна быть подана в письменной форме или в форме
          электронного документа и содержать сведения о заявителе (фамилия, имя, отчество или наименование, адрес
          регистрации или место нахождения); содержание спора и разногласий; сведения об объекте (объектах), в
          отношении которого(ых) возникли разногласия; расчет суммы претензии, если она носит имущественный характер.
          Претензия должна быть направлена Заказчиком в письменном виде на адрес Исполнителя, указанный в Приложении
          № 1 к настоящему Договору. Исполнитель вправе направить претензию в электронном виде по адресу электронной
          почты Заказчика. Сторона, получившая претензию обязана рассмотреть ее и ответить по существу письменно или в
          электронной форме не позднее 30 (тридцати) дней с момента ее получения. В случае недостижения Сторонами
          согласия спор передается на рассмотрение в суд.
        </MediumText>
      </Wrapper>
    </Wrapper>
    <Wrapper flow={'column'} gap={'24px'}>
      <TitleText>8. Реквизиты Исполнителя</TitleText>
      <Wrapper flow={'column'}>
        <MediumText>ООО «НАЦИОНАЛЬНАЯ  МЕДСЛУЖБА»</MediumText>
        <MediumText>ИНН 5027130609</MediumText>
        <MediumText>КПП 770501001</MediumText>
        <MediumText>ОГРН 1085027000123</MediumText>
        <MediumText>Адрес местонахождения: 115184, г. Москва, Озерковская набережная, д. 30, помещение 29, этаж 5</MediumText>
      </Wrapper>
      <Wrapper flow={'column'}>
        <MediumText><strong>АЛЬФА-БАНК (АО)</strong></MediumText>
        <MediumText>Р/с 40702810401300018464</MediumText>
        <MediumText>БИК 044525593</MediumText>
        <MediumText>Кор/с 30101810200000000593</MediumText>
        <MediumText>тел: 8(495)374-88-24</MediumText>
        <MediumText>е-mаil: Khomatskaya@nhs.moscow</MediumText>
        <MediumText>Генеральный директор Чижман Ю.А.</MediumText>
      </Wrapper>
    </Wrapper>
  </Wrapper>
)
